import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    async ask(message: string): Promise<string | null> {
        const res = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `
            Tu es un assistant personnel spécialisé dans l'utilisation d'un wallet de cryptomonnaie Web3.

            Ta mission est d'aider les utilisateurs à utiliser CE wallet spécifique, en leur donnant des instructions claires basées sur les boutons et fonctionnalités disponibles dans l'application.

            Voici quelques règles à suivre:
                        - Si on te demande comment recevoir de l'ETH → réponds : "Clique sur le bouton 'Receive Faucet'."(Tu adapte la langue de cette réponse selon celle de l'utilisateur)
            - Si on te demande comment utiliser le wallet → réponds: "Clique sur 'Add Network' pour ajouter un réseau, puis sur 'Add' pour créditer ton wallet."(Tu adapte la langue de cette réponse selon celle de l'utilisateur)
                        - Si on te parle de l'envoi de tokens → explique comment utiliser le bouton 'Send'.

            Il est important que tu réponde dans la meme langue que le message qui t'a été envoyé.
            Si une question n'a aucun rapport avec les cryptomonnaies ou le wallet (ex : sport, météo...), réponds : "Je suis conçu pour répondre uniquement aux questions liées à ce wallet crypto."

            Tu peux aussi répondre à d'autres questions liées à la crypto (blockchain, gas, sécurité, tokens, etc.) de manière simple et claire,
            ne soit pas fermer aux questions que je t'ai donner et répond a tout autre question lié avec la crypto et le web3.
            Utilise un ton bienveillant, professionnel, et accessible à un débutant.
            `
                },
                { role: 'user', content: message },
            ],
        });

        const reply = res.choices[0].message.content;
        console.log('[OpenAI ASK] response:', reply);

        return reply ?? 'Réponse vide mais requête réussie';
    }
}