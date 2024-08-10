'use client';
import { useEffect } from "react";
import { annotate } from 'rough-notation';

type Props = {
  text: string;
}

export default function Underline(props: Props) {
  useEffect(() => {
    const annotations = document.querySelector('#underline') as HTMLElement;
    if (annotations) {
      const annotation = annotate(annotations, { type: 'highlight', color: 'yellow' });
      setTimeout(() => {
        annotation.show();
      }, 2000); // 2-second delay
    }
  }, []);

  return (
    <div id="underline" className="w-fit inline-flex">{props.text}</div>
  );
}
