export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { nom, telephone, adresse, produit, quantite } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = `
📦 Nouvelle commande

👤 Nom : ${nom}
📞 Téléphone : ${telephone}
🏠 Adresse : ${adresse}
🛍 Produit : ${produit}
🔢 Quantité : ${quantite}
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });

  res.status(200).json({ success: true });
}
