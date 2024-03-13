// todo вынести в qwaPage и qwaElements
export async function waitUntilSync<T, Args extends any[]>(
  //func: () => any,
  func: (...args: Args) => T,
  args: Args,
  expected: any,
  timeout: number = 5000000,
  interval: number = 500
): Promise<boolean> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    //const result = func();
    const result = func(...args)
    if (result === expected) {
      return true // Успешное сравнение
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  return false
}
