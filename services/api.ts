import { useLaunchParamsStore } from "@/stores/launchParams";
import { useUserDataStore } from "@/stores/userData";
import { useLeaserboardStore } from "@/stores/leaderboard";
import { useInvitedStore, Invited } from "@/stores/invited";
import { UserData } from "@/stores/userData";
import { useEarnTasksStore, EarnTaskType } from "@/stores/earnTasks";

const baseApiUrl = process.env.NEXT_PUBLIC_API_HOST;

type UserDataResponse = {
    telegramId: string;
    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;
    isPremium: boolean;
    allowsWriteToPm: boolean;
    refferalCode: string;
    profilePicture: string;
    balance: string;
    energy: string;
    level: number;
    earnByTapBoosterLevel: number;
    energyPerSecondBoosterLevel: number;
    maxEnergyBoosterLevel: number;
    earnPerHourBonus: string;
    lastEnergyUpdateTimestamp: number;
    lastTapTimestamp: number;
    lastDailyClaimTimestamp: number;
    prevDailyClaimTimestamp: number;
    dailyStreak: number;
    lastFullEnergyBonusTimestamp: number;
    fullEnergyBonusCount: number;
    teamId: number | null;
    earnTaskIds: string | null;
    maxEnergy: number;
    energyPerSecond: number;
    earnPerTap: number;
}

type EarnTaskResponse = {
    id: number;
    link: string;
    type: EarnTaskType;
    reward: number;
}

type LeaderboartResponse = {
    telegramId: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePicture: string;
    isPremium: boolean;
    balance: string;
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
        refferalCode: userData.refferalCode,
        profilePicture: userData.profilePicture,
        balance: BigInt(userData.balance),
        energy: BigInt(userData.energy),
        level: userData.level,
        earnByTapBoosterLevel: userData.earnByTapBoosterLevel,
        energyPerSecondBoosterLevel: userData.energyPerSecondBoosterLevel,
        maxEnergyBoosterLevel: userData.maxEnergyBoosterLevel,
        earnPerHourBonus: userData.earnPerHourBonus,
        lastEnergyUpdateTimestamp: userData.lastEnergyUpdateTimestamp,
        lastTapTimestamp: userData.lastTapTimestamp,
        lastDailyClaimTimestamp: userData.lastDailyClaimTimestamp,
        prevDailyClaimTimestamp: userData.prevDailyClaimTimestamp,
        dailyStreak: userData.dailyStreak,
        lastFullEnergyBonusTimestamp: userData.lastFullEnergyBonusTimestamp,
        fullEnergyBonusCount: userData.fullEnergyBonusCount,
        teamId: userData.teamId !== null ? userData.teamId : -1,
        earnTaskIds: userData.earnTaskIds ? userData.earnTaskIds.split(",").map(Number) : [],
        maxEnergy: userData.maxEnergy,
        energyPerSecond: userData.energyPerSecond,
        earnPerTap: userData.earnPerTap,
    }
}

const getInitDataString = () => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        return "development";
    }
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
    const response = await fetch(`${baseApiUrl}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "telegram-init-data": getInitDataString(),
        },
        body: JSON.stringify({
            initData
        })
    });

    if (response.ok) {
        const result = await response.json() as UserDataResponse;
        useUserDataStore.getState().setUserData(processUserData(result));
    }
}

const updateUser = async () => {
    await _updateUserDataRequestBuilder("user");
}

const setTeam = async (teamId: number) => {
    await _updateUserDataRequestBuilder(`team/${teamId}`);
}

const tap = async (count: number) => {
    await _updateUserDataRequestBuilder(`tap/${count}`);
}

const claimDaily = async () => {
    await _updateUserDataRequestBuilder("daily");
}

const claimEarnTask = async (taskId: number) => {
    await _updateUserDataRequestBuilder(`earn-task/${taskId}`);
}

const buyMaxEnergyBooster = async () => {
    await _updateUserDataRequestBuilder("buy-booster/max-energy");
}

const buyEnergyRegenBooster = async () => {
    await _updateUserDataRequestBuilder("buy-booster/energy-regen");
}

const buyEarnTapBooster = async () => {
    await _updateUserDataRequestBuilder("buy-booster/earn-tap");
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
            "telegram-init-data": initDataString,
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
                reward: t.reward,
                isCompleted: isClaimed,
                isClaimed,
            }
        })
        useEarnTasksStore.getState().setTasks(tasks);
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
            "telegram-init-data": initDataString,
        }
    });

    if (response.ok) {
        const result = await response.json() as LeaderboartResponse[];
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
            "telegram-init-data": getInitDataString(),
        },
        body: JSON.stringify({
            initData
        })
    });

    if (response.ok) {
        const result = await response.json() as Invited[];
        useInvitedStore.getState().setInvited(result);
    }
}


export default {
    updateUser,
    setTeam,
    tap,
    claimDaily,
    getEarnTasks,
    claimEarnTask,
    getLeaderboard,
    buyMaxEnergyBooster,
    buyEnergyRegenBooster,
    buyEarnTapBooster,
    invited
}