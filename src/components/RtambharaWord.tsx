import styles from "./RtambharaWord.module.scss";

/** "rtambhara" with the subscript dots under the r and the m. Any trailing
 *  punctuation (e.g. the full stop in "rtambhara.") is kept. */
export default function RtambharaWord({ suffix = "" }: { suffix?: string }) {
  return (
    <>
      <span className={styles.dot}>r</span>ta
      <span className={styles.dot}>m</span>bhara{suffix}
    </>
  );
}

/** Swaps a plain "rtambhara" word for the dotted version. */
export function dottedText(text: string) {
  const match = /^rtambhara([^a-z]*)$/.exec(text);
  return match ? <RtambharaWord suffix={match[1]} /> : text;
}
