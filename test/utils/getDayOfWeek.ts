export default function getWeekDays(date) {
	const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	return days[new Date(date).getDay()];
}
