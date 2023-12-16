
export const textToSpeak = (text: string) => {
  const msg: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    // msg.volume = 1; // From 0 to 1
    // msg.rate = 10; // From 0.1 to 10
    // msg.pitch = 2; // From 0 to 2
    msg.text = text
    //msg.lang = 'es';
    // msg.lang = 'en';
    speechSynthesis.speak(msg);

    // voices.map((voice) => {
    //   // msg.voice = voice;
    //   // speechSynthesis.speak(msg);
    // })
}
