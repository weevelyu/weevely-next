import { useState } from "react"
import { signOut } from "next-auth/client"
import Link from "next/link"

import styles from "../../styles/app.module.scss"

const AccountDropdown = ({ session }) => {
	const [toggle, setToggle] = useState(false)

	return (
		<>
			<button
				onClick={() => setToggle(!toggle)}
				className={styles.barAccountButton}
			>
				<img src={session.user.image} alt='picture' />
			</button>
			{toggle && (
				<div className={styles.dropdownBarOptions}>
					<Link href='/account'>
						<button className={styles.dropdownBarOption}>
							Account
						</button>
					</Link>
					<button
						className={styles.dropdownBarOption}
						name='danger'
						onClick={() =>
							signOut({ callbackUrl: "http://localhost:3000/" })
						}
					>
						Logout
					</button>
				</div>
			)}
		</>
	)
}

export default AccountDropdown