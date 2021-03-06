import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const rows = 16;

  const [translit, setTranslit] = useState("");
  const [cyrillic, setCyrillic] = useState("");
  const [autoCopy, setAutoCopy] = useState(true);

  const t2c = new Map([
    ["a", "а"],
    ["b", "б"],
    ["v", "в"],
    ["w", "в"],
    ["g", "г"],
    ["d", "д"],
    ["e", "е"],
    ["jo", "ё"],
    ["yo", "ё"],
    ["zh", "ж"],
    ["z", "з"],
    ["i", "и"],
    ["j", "й"],
    ["k", "к"],
    ["l", "л"],
    ["m", "м"],
    ["n", "н"],
    ["o", "о"],
    ["p", "п"],
    ["r", "р"],
    ["s", "с"],
    ["t", "т"],
    ["u", "у"],
    ["f", "ф"],
    ["h", "х"],
    ["x", "х"],
    ["c", "ц"],
    ["ch", "ч"],
    ["sh", "ш"],
    ["shh", "щ"],
    ["''", "ъ"],
    ["q", "ъ"],
    ["#", "ъ"],
    ["y", "ы"],
    ["'", "ь"],
    ["je", "э"],
    ["ju", "ю"],
    ["ja", "я"],
    ["j+o", "йо"],
    ["j+e", "йе"],
    ["j+u", "йу"],
    ["j+a", "йа"]
  ]);

  const copyToClipboard = s => {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state == "granted") {
        if (autoCopy) {
          navigator.clipboard.writeText(s);
        }
      }
    });
  };

  const tryMatchPrefix = (s, len) => {
    let matched = false;
    let replacement = "";
    let remaining = s;
    if (s.length >= len) {
      let probe = s.slice(0, len);
      if (t2c.has(probe)) {
        matched = true;
        replacement = t2c.get(probe);
        remaining = s.slice(len);
      } else {
        probe = probe.toLowerCase();
        if (t2c.has(probe)) {
          matched = true;
          replacement = t2c.get(probe).toUpperCase();
          remaining = s.slice(len);
        }
      }
    }
    return {
      matched: matched,
      replacement: replacement,
      remaining: remaining
    };
  };

  const translitToCyrillic = s => {
    let left = s;
    let result = "";
    while (left.length > 0) {
      let res = tryMatchPrefix(left, 3);
      if (res.matched) {
        result += res.replacement;
        left = res.remaining;
        continue;
      }
      res = tryMatchPrefix(left, 2);
      if (res.matched) {
        result += res.replacement;
        left = res.remaining;
        continue;
      }
      res = tryMatchPrefix(left, 1);
      if (res.matched) {
        result += res.replacement;
      } else {
        result += left.slice(0, 1);
      }
      left = left.slice(1);
    }
    return result;
  };

  const cyrillcToTranslit = s => {
    return s.toLowerCase();
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "translit") {
      setTranslit(value);
      const translated = translitToCyrillic(value);
      setCyrillic(translated);
      copyToClipboard(translated);
    } else {
      setCyrillic(value);
      setTranslit(cyrillcToTranslit(value));
    }
  };

  const handleAutoCopy = e => {
    setAutoCopy(!autoCopy);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="m-5">
          <div className="input-group">
            <textarea
              rows={rows}
              name="translit"
              className="form-control"
              placeholder="type translit here"
              value={translit}
              onChange={handleChange}
            />
            <span className="input-group-addon">&nbsp;</span>
            <textarea
              rows={rows}
              name="cyrillic"
              className="form-control"
              placeholder="Cyrillic will appear here"
              value={cyrillic}
              onChange={e => {}}
            />
          </div>
          <div className="custom-control custom-checkbox mt-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="auto-copy"
              checked={autoCopy}
              onChange={handleAutoCopy}
            />
            <label className="custom-control-label" htmlFor="auto-copy">
              Automatically place the Cyrillic text on the clipboard
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
