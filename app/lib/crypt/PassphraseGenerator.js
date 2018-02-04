const niceware = require('niceware');

export default class PassphraseGenerator {
  /**
   * Creates a passphrase that has a low/medium level of entropy
   */
  static makeSimplePassword = () => niceware.generatePassphrase(8).toString();
  /**
   * Creates a passpharse to be remembered that has a normal/high level entropy
   */
  static makeNormalPassword = () => niceware.generatePassphrase(10).toString();
}
