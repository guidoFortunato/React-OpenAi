import { useState } from "react";
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { imageGenerationUseCase } from "../../../core/use-cases";
import { GptMessageImage } from "../../components/chat-bubbles/GptMessageImage";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { text: "No se pudo generar la imagen", isGpt: true },
      ]);
    }

    return setMessages((prev) => [
      ...prev,
      {
        text: text,
        isGpt: true,
        info: {
          imageUrl: imageInfo.url,
          alt: imageInfo.alt,
        },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="¿Qué imagen deseas generar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage
                key={ index }
                text={ message.text }
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                imageUrl={ message.info?.imageUrl! }
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                alt={ message.info?.alt! }
              />
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
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  );
};
