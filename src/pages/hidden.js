import axios from "axios"
import nookies from "nookies"
import { useState } from "react"
import Application from "../components/Layout"
import CalendarList from "../components/Calendars/CalendarList"
import styles from "../styles/app.module.scss"

export default function hidden({ user, data }) {
	const [calendars, setCalendars] = useState(data)
	return (
		<Application user={user} title='Hidden calendars'>
			<h1 className={styles.pageTitle}>Hidden calendars</h1>
			<div className={styles.calendarsPage}>
				<CalendarList
					calendars={calendars}
					setCalendars={setCalendars}
					accessToken={user.token}
				/>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	try {
		const user = JSON.parse(nookies.get(ctx).user)
		const response = await axios.get(
			`${process.env.API_URL}/calendars/my/hidden`,
			{
				headers: {
					Accept: "application/json",
					Authorization: user.token,
				},
			}
		)
		return { props: { user: user, data: response.data } }
	} catch (e) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}
}
