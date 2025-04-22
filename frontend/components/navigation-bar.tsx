interface NavigationBarProps {
  userType?: "student" | "teacher" | "guest"
  userName?: string
  currentDate?: string
}

export function NavigationBar({
  userType = "guest",
  userName = "",
  currentDate = "MARCH 8, 2023",
}: NavigationBarProps) {
  return (
    <div className="raider-nav">
      <div className="raider-nav-left">
        <span>{userType.toUpperCase()} PAGE</span>
        {userName && <span>|</span>}
        {userName && <span>{userName}</span>}
      </div>
      <div className="raider-nav-right">
        <span>CURRENT DATE: {currentDate}</span>
        <span>|</span>
        <span>HCPSS</span>
        <span>|</span>
        <span>HELP</span>
      </div>
    </div>
  )
}