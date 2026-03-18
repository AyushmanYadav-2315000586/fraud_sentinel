type RiskInput = {
  amount: number;
  avgTransactionAmount: number;
  knownDevices: string[];
  deviceId: string;
  lastTransactionTime: Date | null;
};

type RiskOutput = {
  riskScore: number;
  decision: "APPROVE" | "FLAG" | "DECLINE";
};

export function calculateRisk(input: RiskInput): RiskOutput {
  let riskScore = 0;
  const {
    amount,
    avgTransactionAmount,
    knownDevices,
    deviceId,
    lastTransactionTime,
  } = input;
  if (avgTransactionAmount > 0 && amount > avgTransactionAmount * 10) {
    riskScore += 40;
  }
  if (!knownDevices.includes(deviceId)) {
    riskScore += 30;
  }
  if (lastTransactionTime) {
    const now = new Date();
    const diff = now.getTime() - new Date(lastTransactionTime).getTime();

    const oneMin = 60 * 1000;
    if (diff < oneMin) {
      riskScore += 30;
    }
  }
  let decision: RiskOutput["decision"];
  if (riskScore >= 70) {
    decision = "DECLINE";
  } else if (riskScore >= 40) {
    decision = "FLAG";
  } else {
    decision = "APPROVE";
  }

  return { riskScore, decision };
}
