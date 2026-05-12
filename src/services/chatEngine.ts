const responses: Record<string, string> = {
  hello:
    "Hello. The platform survives another day.",

  player:
    "Player Mode is where curiosity becomes interactive chaos.",

  creator:
    "Creator Studio is where ideas either evolve... or collapse dramatically.",

  synapse:
    "I am Synapse. Professional observer of human experimentation.",

  games:
    "Some games teach skill. Some teach suffering. Both are educational.",

  default:
    "Interesting. Continue your questionable creativity."
};

export const getSynapseReply = async (
  input: string
): Promise<string> => {

  // ============================================
  // FUTURE API PLACE
  // ============================================

  /*
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message: input }),
  });

  const data = await response.json();

  return data.reply;
  */

  // ============================================
  // TEMP LOCAL RESPONSE SYSTEM
  // ============================================

  const normalized = input.toLowerCase();

  for (const key in responses) {
    if (normalized.includes(key)) {
      return responses[key];
    }
  }

  return responses.default;
};