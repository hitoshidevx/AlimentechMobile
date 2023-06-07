# Alimentech

Nosso objetivo é orientar e incentivar pessoas com insegurança alimentar a começar uma pequena agricultura familiar, dando ótimas dicas baseadas no espaço, região, recursos e tempo até a colheita que a pessoa se dispõe a esperar.

---

## Como utilizar?

Você precisa de apenas duas coisas:

- Uma IDE (Visual Studio Code, de preferência)
- ExpoGO (No seu celular)

Após instalar todos os pacotes do nosso projeto, rode o comando:

`npx expo start`

No seu terminal, aparecerá um QR Code. Leia ele com o aplicativo ExpoGO que você instalou anteriormente. Assim que a leitura for finalizada, será possível rodar o aplicativo no seu celular :D

---

## Endpoints

`POST` https://api.openai.com/v1/chat/completions

Utilizamos apenas um endpoint de integração com a API da OpenAI para a integração da inteligência artificial que se baseia num conjunto de respostas inseridas pelo usuário para gerar uma orientação personalizada.
