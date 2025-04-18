// rewardUtils.js

// Refactored helper: shared logic for quiz rewards
export function giveQuizReward(modifyResources) {
    modifyResources({
      fuel: 5,
      oxygen: 7,
      minerals: 10,
    });
  }
  