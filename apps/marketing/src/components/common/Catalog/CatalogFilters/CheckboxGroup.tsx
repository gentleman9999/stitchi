const CheckboxGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
      {children}
    </div>
  )
}

export default CheckboxGroup
