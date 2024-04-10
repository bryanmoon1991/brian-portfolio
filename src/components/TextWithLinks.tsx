import { createEffect, createSignal, For } from "solid-js";

const TextWithLinks = (props) => {
  const [paragraphs, setParagraphs] = createSignal([]);

  createEffect(() => {
    const regex = /<link\|(.*?)>(.*?)<\/link>/g;
    const inputText = props.content;
    let parts = [];
    let lastIndex = 0;
    let currentParagraph = { type: "p", content: [] };

    inputText.replace(regex, (match, url, text, index) => {
      if (index > lastIndex) {
        currentParagraph.content.push({
          type: "text",
          content: inputText.slice(lastIndex, index),
        });
      }
      currentParagraph.content.push({ type: "link", content: text, url });
      lastIndex = index + match.length;
      return match;
    });

    if (lastIndex < inputText.length) {
      currentParagraph.content.push({
        type: "text",
        content: inputText.slice(lastIndex),
      });
    }

    parts.push(currentParagraph);
    setParagraphs(parts);
  });

  return (
    <For each={paragraphs()}>
      {(paragraph) => (
        <p class="lg:text-4 xs:text-3 m-0 w-full mt-1">
          <For each={paragraph.content}>
            {(part) =>
              part.type === "link" ? (
                <a
                  class="lg:text-4 xs:text-3 m-0 inline-block"
                  href={part.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.content}
                </a>
              ) : (
                part.content
              )
            }
          </For>
        </p>
      )}
    </For>
  );
};

export default TextWithLinks;
