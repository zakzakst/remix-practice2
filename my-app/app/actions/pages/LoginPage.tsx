import { clientEntry, css, on } from "remix/component";
import type { Handle } from "remix/component";

import { Parts2 } from "../public/parts2.tsx";

const part1Styles = css({
  backgroundColor: "#f00",
});

type Parts1Props = {
  name: string;
};

const Parts1 = (handle: Handle<Parts1Props>) => {
  return () => <div mix={part1Styles}>parts 1 {handle.props.name}</div>;
};

// export const Parts2 = clientEntry(
//   import.meta.url + "#Parts2",
//   (handle: Handle) => {
//     let count = 0;

//     return () => (
//       <button
//         type="button"
//         mix={on("click", () => {
//           count++;
//           handle.update();
//         })}
//       >
//         Count: {count}
//       </button>
//     );
//   },
// );

export const LoginPage = () => {
  return () => (
    <div>
      <h1>Login Page</h1>
      <Parts1 name="taro" />
      <Parts2 />
    </div>
  );
};
