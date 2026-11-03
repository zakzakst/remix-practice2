import { clientEntry, on } from "remix/component";
import type { Handle } from "remix/component";

export const Parts2 = clientEntry(
  import.meta.url,
  function Parts2(handle: Handle) {
    let count = 0;

    return () => (
      <button
        type="button"
        mix={on("click", () => {
          // TODO: 上手く動かない
          count++;
          handle.update();
        })}
      >
        Count: {count}
      </button>
    );
  },
);
