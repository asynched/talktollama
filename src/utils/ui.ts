interface PreventDefault {
  preventDefault: () => void
}

export function preventDefault<Event extends PreventDefault>(
  fn?: (event: Event) => void,
) {
  return (event: Event) => {
    event.preventDefault()
    fn?.(event)
  }
}
