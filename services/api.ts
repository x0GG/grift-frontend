import { useLaunchParamsStore } from "@/stores/launchParams";
import { useUserDataStore } from "@/stores/userData";
import { useLeaserboardStore } from "@/stores/leaderboard";
import { useInvitedStore, Invited } from "@/stores/invited";
import { UserData, PurchasedMiningCards } from "@/stores/userData";
import { useEarnTasksStore, EarnTaskType } from "@/stores/earnTasks";
import { useMiningCardsStore } from "@/stores/miningCards";
import { levels } from "@/config/levels"

const baseApiUrl = process.env.NEXT_PUBLIC_API_HOST;
const retryCount = 3;

type UserDataResponse = {
    telegramId: string;
    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;
    isPremium: boolean;
    allowsWriteToPm: boolean;
    referralCode: string;
    profilePicture: string;
    balance: string;
    energy: string;
    level: number;
    earnByTapBoosterLevel: number;
    maxEnergyBoosterLevel: number;
    earnPerHourBonus: string;
    lastEnergyUpdateTimestamp: number;
    lastTapTimestamp: number;
    lastDailyClaimTimestamp: number;
    dailyStreak: number;
    lastFullEnergyBonusTimestamp: number;
    firstFullEnergyBonusTimestamp: number;
    fullEnergyBonusCount: number;
    teamId: number | null;
    earnTaskIds: string | null;
    maxEnergy: string;
    energyPerSecond: number;
    earnPerTap: number;
    earnPerHour: string;
    lastBalanceByMiningUpdateTimestamp: number;
    purchasedMiningCards: PurchasedMiningCards[];
}

type EarnTaskResponse = {
    id: number;
    link: string;
    type: EarnTaskType;
    reward: number;
    order: number;
}

type MiningCardLevelResponse = {
    level: number;
    cost: bigint;
    earnPerHourBonus: bigint;
    minimalUserLevel: number;
    dependedOnCardId: number;
    dependedOnCardLevel: number;
    minInvitedUsers: number;
}

type MiningCardResponse = {
    id: number;
    name: string;
    description: string;
    image: string;
    groupTag: string;
    groupName: string;
    levels: MiningCardLevelResponse[];
}

type LeaderboardResponse = {
    telegramId: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    isPremium: boolean;
    balance: string;
}

type InvitedResponse = {
    invited: Invited[];
    total: number;
}

const processUserData = (userData: UserDataResponse): UserData => {
    return {
        telegramId: userData.telegramId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        languageCode: userData.languageCode,
        isPremium: userData.isPremium,
        allowsWriteToPm: userData.allowsWriteToPm,
        referralCode: userData.referralCode,
        profilePicture: userData.profilePicture,
        balance: BigInt(userData.balance),
        energy: BigInt(userData.energy),
        level: userData.level,
        earnByTapBoosterLevel: userData.earnByTapBoosterLevel,
        maxEnergyBoosterLevel: userData.maxEnergyBoosterLevel,
        earnPerHourBonus: userData.earnPerHourBonus,
        lastEnergyUpdateTimestamp: userData.lastEnergyUpdateTimestamp,
        lastTapTimestamp: userData.lastTapTimestamp,
        lastDailyClaimTimestamp: userData.lastDailyClaimTimestamp,
        dailyStreak: userData.dailyStreak,
        lastFullEnergyBonusTimestamp: userData.lastFullEnergyBonusTimestamp,
        firstFullEnergyBonusTimestamp: userData.firstFullEnergyBonusTimestamp,
        fullEnergyBonusCount: userData.fullEnergyBonusCount,
        teamId: userData.teamId !== null ? userData.teamId : -1,
        earnTaskIds: userData.earnTaskIds ? userData.earnTaskIds.split(",").map(Number) : [],
        maxEnergy: BigInt(userData.maxEnergy),
        energyPerSecond: userData.energyPerSecond,
        earnPerTap: userData.earnPerTap,
        earnPerHour: BigInt(userData.earnPerHour),
        purchasedMiningCards: userData.purchasedMiningCards,
        lastBalanceByMiningUpdateTimestamp: userData.lastBalanceByMiningUpdateTimestamp,
    }
}

const getInitDataString = () => {
    return useLaunchParamsStore.getState().launchParams?.initDataRaw || "";
}

const getInitData = () => {
    return useLaunchParamsStore.getState().launchParams?.initData || null;
}

const _updateUserDataRequestBuilder = async (url: string) => {
    const initData = getInitData();
    if (!initData) {
        return;
    }

    const requestParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": getInitDataString(),
        },
        body: JSON.stringify({
            initData
        })
    };
    const requestURL = `${baseApiUrl}/${url}`;

    for (let i = 0; i < retryCount; i++) {
        const response = await fetch(requestURL, requestParams);

        if (response.ok) {
            const result = await response.json() as UserDataResponse;
            useUserDataStore.getState().setUserData(processUserData(result));
            return;
        }
    }
}

const updateUser = async () => {
    await _updateUserDataRequestBuilder("user");
}

const setTeam = async (teamId: number) => {
    await _updateUserDataRequestBuilder(`team/${teamId}`);
}

const tap = async (count: number) => {
    const initData = getInitData();
    if (!initData) {
        return;
    }

    const requestParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": getInitDataString(),
        },
        body: JSON.stringify({
            initData
        })
    };
    const requestURL = `${baseApiUrl}/tap/${count}`;

    for (let i = 0; i < retryCount; i++) {
        const response = await fetch(requestURL, requestParams);

        if (response.ok) {
            const result = await response.json() as UserDataResponse;
            const resultData = processUserData(result);
            const resultBalance = resultData?.balance || BigInt(0);
            const balance = useUserDataStore.getState().userData?.balance || BigInt(0);
            if (resultBalance >= balance) {
                useUserDataStore.getState().setUserData(resultData);
            }
            return;
        }
    }
}

const claimDaily = async () => {
    await _updateUserDataRequestBuilder("daily");
}

const claimEarnTask = async (taskId: number) => {
    await _updateUserDataRequestBuilder(`earn-task/${taskId}`);
}

const buyMiningCard = async (cardId: number) => {
    await _updateUserDataRequestBuilder(`buy-mining-card/${cardId}`);
}

const buyMaxEnergyBooster = async () => {
    await _updateUserDataRequestBuilder("buy-booster/max-energy");
}

const buyEarnTapBooster = async () => {
    await _updateUserDataRequestBuilder("buy-booster/earn-tap");
}

const refillEnergy = async () => {
    await _updateUserDataRequestBuilder("refill-energy");
}

const getEarnTasks = async () => {
    const initDataString = getInitDataString();
    if (!initDataString) {
        return;
    }
    const response = await fetch(`${baseApiUrl}/earn-tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": initDataString,
        }
    });

    if (response.ok) {
        const result = await response.json() as EarnTaskResponse[];
        const userData = useUserDataStore.getState().userData;
        if (!userData) {
            return;
        }
        const tasks = result.map((t) => {
            const isClaimed = userData.earnTaskIds.includes(t.id);
            return {
                id: t.id,
                link: t.link,
                type: t.type,
                reward: BigInt(t.reward),
                order: t.order,
                isCompleted: isClaimed,
                isClaimed,
            }
        })
        useEarnTasksStore.getState().setTasks(tasks);
    }
}

const getMiningCards = async () => {
    const initDataString = getInitDataString();
    if (!initDataString) {
        return;
    }
    const response = await fetch(`${baseApiUrl}/mining-cards`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": initDataString,
        }
    });

    if (response.ok) {
        const result = await response.json() as MiningCardResponse[];
        const userData = useUserDataStore.getState().userData;
        if (!userData) {
            return;
        }

        await invited();
        const invitedCount = useInvitedStore.getState().invited.length;

        const checkCardAvailability = (cardLevel: MiningCardLevelResponse): string[] => {
            const requirements: string[] = [];
            if (cardLevel.minimalUserLevel > userData.level) {
                requirements.push(`Lvl. ${levels[cardLevel.minimalUserLevel].name}`);
            }
            if (cardLevel.dependedOnCardId) {
                const dependedCard = userData.purchasedMiningCards.find((c) => c.id === cardLevel.dependedOnCardId);
                if (!dependedCard || dependedCard.level < cardLevel.dependedOnCardLevel) {
                    requirements.push(`${result.find((c) => c.id === cardLevel.dependedOnCardId)?.name}: Lvl. ${cardLevel.dependedOnCardLevel}`);
                }
            }
            if (cardLevel.minInvitedUsers > invitedCount) {
                requirements.push(`Invite ${cardLevel.minInvitedUsers} fren${cardLevel.minInvitedUsers > 1 ? "s" : ""}`);
            }
            return requirements;
        }

        const cards = result.map((card) => {
            let purchased = userData.purchasedMiningCards.find((c) => c.id === card.id);
            if (!purchased) {
                purchased = {
                    id: card.id,
                    level: 0,
                }
            }
            return {
                id: card.id,
                name: card.name,
                description: card.description,
                image: card.image,
                groupTag: card.groupTag,
                groupName: card.groupName,
                purchasedLevel: purchased.level,
                levels: card.levels.map((l) => {
                    const requirements = checkCardAvailability(l);
                    return {
                        level: l.level,
                        cost: BigInt(l.cost),
                        earnPerHourBonus: BigInt(l.earnPerHourBonus),
                        minimalUserLevel: l.minimalUserLevel,
                        dependedOnCardId: l.dependedOnCardId,
                        dependedOnCardLevel: l.dependedOnCardLevel,
                        minInvitedUsers: l.minInvitedUsers,
                        isPurchased: purchased.level >= l.level,
                        isAvailable: requirements.length === 0,
                        requirements,
                    }
                }),
            }
        })

        useMiningCardsStore.getState().setCards(cards);
    }
}

export const getLeaderboard = async (level: number) => {
    const initDataString = getInitDataString();
    if (!initDataString) {
        return;
    }
    const response = await fetch(`${baseApiUrl}/leaderboard/${level}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": initDataString,
        }
    });

    if (response.ok) {
        const result = await response.json() as LeaderboardResponse[];
        const leaders = result.map((l) => {
            return {
                telegramId: l.telegramId,
                firstName: l.firstName,
                lastName: l.lastName,
                username: l.username,
                profilePicture: l.profilePicture,
                isPremium: l.isPremium,
                balance: BigInt(l.balance),
            }
        });
        useLeaserboardStore.getState().setLeaders(leaders);
    }
}

const invited = async () => {
    const initData = getInitData();
    if (!initData) {
        return;
    }
    const response = await fetch(`${baseApiUrl}/invited`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-telegram-auth": getInitDataString(),
        },
        body: JSON.stringify({
            initData
        })
    });

    if (response.ok) {
        const result = await response.json() as InvitedResponse;
        if (result.invited) {
            useInvitedStore.getState().setInvited(result.invited);
        }
        if (result.total) {
            useInvitedStore.getState().setTotal(result.total);
        }
    }
}


export default {
    updateUser,
    setTeam,
    tap,
    claimDaily,
    getEarnTasks,
    getMiningCards,
    claimEarnTask,
    getLeaderboard,
    buyMaxEnergyBooster,
    buyEarnTapBooster,
    buyMiningCard,
    refillEnergy,
    invited
}