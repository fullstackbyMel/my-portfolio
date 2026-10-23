function ExternalLink({ href, children, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="outbound-click"
      data-umami-event-url={href}
      {...rest}
    >
      {children}
    </a>
  )
}

export default ExternalLink