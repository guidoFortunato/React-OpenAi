import { useState } from "react";
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
// import { TextMessageBoxFile } from "../../components/chat-input-boxes/TextMessageBoxFile";
// import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // Todo: USE CASE
    setIsLoading(false);

    // Todo: añadir el mensaje de isGPT en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="Esto es de OpenAI" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={ handlePost }
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
      {/* <TextMessageBoxFile
        onSendMessage={ handlePost }
        placeholder="Escribe aquí lo que deseas"
      /> */}
      {/* <TextMessageBoxSelect
        options={[
          { id: "1", text: "Hola" },
          { id: "2", text: "Mundo" },
        ]}
        onSendMessage={ console.log }
      /> */}
    </div>
  );
};
