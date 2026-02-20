// keyboard-wrapper.js - Wrapper to replace robotjs with nut-js
const { Keyboard, Key } = require('@nut-tree-fork/nut-js');

// Key mapping from controlcast key names to nut-js Key enum
const keyMap = {
  'a': Key.A, 'b': Key.B, 'c': Key.C, 'd': Key.D, 'e': Key.E,
  'f': Key.F, 'g': Key.G, 'h': Key.H, 'i': Key.I, 'j': Key.J,
  'k': Key.K, 'l': Key.L, 'm': Key.M, 'n': Key.N, 'o': Key.O,
  'p': Key.P, 'q': Key.Q, 'r': Key.R, 's': Key.S, 't': Key.T,
  'u': Key.U, 'v': Key.V, 'w': Key.W, 'x': Key.X, 'y': Key.Y, 'z': Key.Z,
  '0': Key.Num0, '1': Key.Num1, '2': Key.Num2, '3': Key.Num3, '4': Key.Num4,
  '5': Key.Num5, '6': Key.Num6, '7': Key.Num7, '8': Key.Num8, '9': Key.Num9,
  'enter': Key.Return, 'return': Key.Return,
  'escape': Key.Escape, 'esc': Key.Escape,
  'space': Key.Space,
  'backspace': Key.Backspace,
  'tab': Key.Tab,
  'ctrl': Key.Control, 'control': Key.Control,
  'l-ctrl': Key.LeftControl, 'left_control': Key.LeftControl,
  'r-ctrl': Key.RightControl, 'right_control': Key.RightControl,
  'shift': Key.Shift,
  'l-shift': Key.LeftShift, 'left_shift': Key.LeftShift,
  'r-shift': Key.RightShift, 'right_shift': Key.RightShift,
  'alt': Key.Alt,
  'l-alt': Key.LeftAlt, 'left_alt': Key.LeftAlt,
  'r-alt': Key.RightAlt, 'right_alt': Key.RightAlt,
  'up': Key.Up, 'down': Key.Down, 'left': Key.Left, 'right': Key.Right,
  'home': Key.Home, 'end': Key.End, 'pageup': Key.PageUp, 'pagedown': Key.PageDown,
  'delete': Key.Delete, 'del': Key.Delete,
  'insert': Key.Insert,
  'f1': Key.F1, 'f2': Key.F2, 'f3': Key.F3, 'f4': Key.F4,
  'f5': Key.F5, 'f6': Key.F6, 'f7': Key.F7, 'f8': Key.F8,
  'f9': Key.F9, 'f10': Key.F10, 'f11': Key.F11, 'f12': Key.F12,
  'numpad_0': Key.NumPad0, 'numpad_1': Key.NumPad1, 'numpad_2': Key.NumPad2,
  'numpad_3': Key.NumPad3, 'numpad_4': Key.NumPad4, 'numpad_5': Key.NumPad5,
  'numpad_6': Key.NumPad6, 'numpad_7': Key.NumPad7, 'numpad_8': Key.NumPad8,
  'numpad_9': Key.NumPad9,
  'numpad_divide': Key.NumPadDivide,
  'numpad_multiply': Key.NumPadMultiply,
  'numpad_minus': Key.NumPadMinus,
  'numpad_plus': Key.NumPadPlus,
  'numpad_decimal': Key.NumPadDecimal,
};

// Initialize nut-js configuration
Keyboard.config.autoDelayMs = 50;

class KeyboardWrapper {
  constructor() {
    this.delay = 50;
    this.keyboard = Keyboard;
  }

  setKeyboardDelay(ms) {
    this.delay = ms;
    Keyboard.config.autoDelayMs = ms;
  }

  async keyToggle(keyName, action) {
    const key = this._resolveKey(keyName);
    if (!key) {
      console.warn(`Unknown key: ${keyName}`);
      return;
    }

    try {
      if (action === 'down') {
        await this.keyboard.pressKey(key);
      } else if (action === 'up') {
        await this.keyboard.releaseKey(key);
      }
    } catch (err) {
      console.error(`Keyboard error for ${keyName}:`, err.message);
    }
  }

  _resolveKey(keyName) {
    const normalized = keyName.toLowerCase().trim();
    return keyMap[normalized] || null;
  }
}

// Export a singleton instance that mimics robotjs API
module.exports = new KeyboardWrapper();
module.exports.KeyboardWrapper = KeyboardWrapper;