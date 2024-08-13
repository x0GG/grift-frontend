export const HOST = process.env.NEXT_PUBLIC_HOST || ''

export const DECIMALS = 2
export const DECIMALS_MULTIPLIER = 10 ** DECIMALS

export const GSAP_DURATION = 1
export const GSAP_STAGGER = 0.15
export const GSAP_EASE = "none"
export const GSAP_ST_START = "top 90%"

export const DURATION_FEEDBACK = 2000
export const ENERGY_CHARGE_DELAY = 1000
export const PROFIT_UPDATE_DELAY = 1000

export const basic = {
    earnByTap: 0.3,
    earnPerHour: 0,
    maxEnergy: 100,
    fullEnergyRecoveryTime: 60 * 60, // 1 hour
}

const dailyTasks = [
    { reward: 20 },
    { reward: 40 },
    { reward: 100 },
    { reward: 200 },
    { reward: 400 },
    { reward: 800 },
    { reward: 1500 },
    { reward: 3000 },
    { reward: 5000 },
    { reward: 10000 }
]

export const DAILY_TASKS = dailyTasks.map((task, i) => ({ ...task, reward: BigInt(task.reward) * BigInt(DECIMALS_MULTIPLIER) }))

const maxEnergyBoostNumber = [
    { cost: 0, boost: 0 }, // level 0
    { cost: 100, boost: 50 }, // level 1
    { cost: 500, boost: 100 }, // level 2
    { cost: 1000, boost: 100 }, // level 3
    { cost: 2500, boost: 100 }, // level 4
    { cost: 5000, boost: 100 }, // level 5
    { cost: 7500, boost: 100 }, // level 6
    { cost: 12500, boost: 100 }, // level 7
    { cost: 17500, boost: 100 }, // level 8
    { cost: 25000, boost: 100 }, // level 9
    { cost: 50000, boost: 100 } // level 10
];

export const maxEnergyBoost = maxEnergyBoostNumber.map((value) => ({
    cost: BigInt(value.cost) * BigInt(DECIMALS_MULTIPLIER),
    boost: value.boost
}));

const earnByTapBoostNumber = [
    { cost: 0, boost: 0 }, // level 0
    { cost: 100, boost: 1 }, // level 1
    { cost: 500, boost: 2 }, // level 2
    { cost: 1000, boost: 3 }, // level 3
    { cost: 2500, boost: 4 }, // level 4
    { cost: 5000, boost: 5 }, // level 5
    { cost: 7500, boost: 6 }, // level 6
    { cost: 12500, boost: 7 }, // level 7
    { cost: 17500, boost: 8 }, // level 8
    { cost: 25000, boost: 9 }, // level 9
    { cost: 50000, boost: 10 } // level 10
];

export const earnByTapBoost = earnByTapBoostNumber.map((value) => ({
    cost: BigInt(value.cost) * BigInt(DECIMALS_MULTIPLIER),
    boost: value.boost
}));

export const referralBonus = {
    regular: 100,
    premium: 200,
};

export const referralBonusPerLevel = [
    { level: 2, regular: 250, premium: 500 },
    { level: 3, regular: 500, premium: 1_000 },
    { level: 4, regular: 1_000, premium: 2_000 },
    { level: 5, regular: 1_500, premium: 3_000 },
    { level: 6, regular: 3_000, premium: 6_000 },
    { level: 7, regular: 5_000, premium: 12_000 },
    { level: 8, regular: 10_000, premium: 25_000 },
    { level: 9, regular: 20_000, premium: 45_000 },
    { level: 10, regular: 50_000, premium: 120_000 },
];