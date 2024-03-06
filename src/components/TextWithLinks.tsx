import { createEffect, createSignal, For } from 'solid-js';

const TextWithLinks = (props) => {
  const [segments, setSegments] = createSignal([]);

  createEffect(() => {
    const regex = /<link\|(.*?)>(.*?)<\/link>/g;
    const inputText = props.content;
    let parts = [];
    let lastIndex = 0;

    inputText.replace(regex, (match, url, text, index) => {
      if (index > lastIndex) {
        parts.push({ type: 'text', content: inputText.slice(lastIndex, index) });
      }
      parts.push({ type: 'link', content: text, url });
      lastIndex = index + match.length;
      return match; // This return is not used; replace is used here for its side effects
    });

    if (lastIndex < inputText.length) {
      parts.push({ type: 'text', content: inputText.slice(lastIndex) });
    }

    setSegments(parts);
  });

  return (
    <section>
      <For each={segments()}>
        {(part) =>
          part.type === 'link' ? (
            <a class='m-0' href={part.url} target="_blank" rel="noopener noreferrer">
              {part.content}
            </a>
          ) : (
            <span class='m-0'>{part.content}</span>
          )
        }
      </For>
    </section>
  );
};

export default TextWithLinks