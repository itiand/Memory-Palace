export function termForAiDrawer(keyword, definition) {
  return `give me a symbol that best describes ${keyword} + ${definition}. Make it short, make it easy to draw, no more than 5 words.`;
}


export function termForAiDrawer1(symboldescription) {
  return `Draw me ${symboldescription} Make it 90 by 90 pixels`;
}
