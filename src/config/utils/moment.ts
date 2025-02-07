// moment.ts

class moment {
	private date: Date;

	constructor(date?: Date | string | number) {
		const parsedDate = date ? new Date(date) : new Date();
		if (isNaN(parsedDate.getTime())) {
			throw new Error("Data inválida");
		}
		this.date = parsedDate;
	}

	// Método estático para obter a data com argumento opcional
	static time(date: Date = new Date()): moment {
		return new moment(new Date(date));
	}

	startOf(unit: "day" | "month" | "year" | "week"): moment {
		const date = new Date(this.date);
		switch (unit) {
			case "day":
				date.setHours(0, 0, 0, 0);
				break;
			case "month":
				date.setHours(0, 0, 0, 0);
				date.setDate(1);
				break;
			case "year":
				date.setHours(0, 0, 0, 0);
				date.setMonth(0, 1);
				break;
			case "week": {
				date.setHours(0, 0, 0, 0);
				const day = date.getUTCDay();
				const diff = date.getDate() - day;
				date.setDate(diff);
				break;
			}
		}
		return new moment(date);
	}

	endOf(unit: "day" | "month" | "year" | "week"): moment {
		const date = this.date;
		switch (unit) {
			case "day":
				date.setHours(23, 59, 0, 0);
				break;
		}
		return new moment(date);
	}

	// Método para formatar a data
	format(formatString: string = "YYYY-MM-DD HH:mm:ss"): string {
		const pad = (num: number) => String(num).padStart(2, "0");
		const year = this.date.getFullYear();
		const month = pad(this.date.getMonth() + 1);
		const day = pad(this.date.getDate());
		const hours = pad(this.date.getHours());
		const minutes = pad(this.date.getMinutes());
		const seconds = pad(this.date.getSeconds());

		return formatString
			.replace("YYYY", String(year))
			.replace("MM", month)
			.replace("DD", day)
			.replace("HH", hours)
			.replace("mm", minutes)
			.replace("ss", seconds);
	}

	// Método para adicionar tempo
	add(
		amount: number,
		unit: "days" | "months" | "years" | "hours" | "minutes"
	): moment {
		const date = new Date(this.date);
		switch (unit) {
			case "days":
				date.setDate(date.getDate() + amount);
				break;
			case "months":
				date.setMonth(date.getMonth() + amount);
				break;
			case "years":
				date.setFullYear(date.getFullYear() + amount);
				break;
			case "hours":
				date.setHours(date.getHours() + amount);
				break;
			case "minutes":
				date.setMinutes(date.getMinutes() + amount);
				break;
		}
		return new moment(date);
	}

	subtract(
		amount: number,
		unit: "days" | "months" | "years" | "hours" | "minutes"
	): moment {
		const date = new Date(this.date);
		switch (unit) {
			case "days":
				date.setDate(date.getDate() - amount);
				break;
			case "months":
				date.setMonth(date.getMonth() - amount);
				break;
			case "years":
				date.setFullYear(date.getFullYear() - amount);
				break;
			case "hours":
				date.setHours(date.getHours() - amount);
				break;
			case "minutes":
				date.setMinutes(date.getMinutes() - amount);
				break;
		}
		return new moment(date);
	}

	utcOffset(offset: number): moment {
		const date = new Date(this.date);
		date.setMinutes(date.getMinutes() + offset);
		return new moment(date);
	}

	// Método para converter para um objeto Date sem alterar a hora
	toDate(): Date {
		const utcDate = new Date(this.date);
		const offset = -utcDate.getTimezoneOffset();
		// Ajusta o horário subtraindo o offset local para que o UTC seja 00
		utcDate.setMinutes(utcDate.getMinutes() + offset);
		return new Date(
			Date.UTC(
				utcDate.getUTCFullYear(),
				utcDate.getUTCMonth(),
				utcDate.getUTCDate(),
				utcDate.getUTCHours(),
				utcDate.getUTCMinutes(),
				utcDate.getUTCSeconds()
			)
		);
	}

	// Métodos de comparação
	isBefore(other: moment): boolean {
		return this.date < other.date;
	}

	isAfter(other: moment): boolean {
		return this.date > other.date;
	}

	isSame(other: moment): boolean {
		return this.date.getTime() === other.date.getTime();
	}

	// Método de diferença
	diff(
		other: moment,
		unit: "days" | "months" | "years" | "hours" | "minutes"
	): number {
		const diffTime = other.date.getTime() - this.date.getTime();
		switch (unit) {
			case "days":
				return Math.floor(diffTime / (1000 * 60 * 60 * 24));
			case "months":
				return (
					(other.date.getFullYear() - this.date.getFullYear()) * 12 +
					(other.date.getMonth() - this.date.getMonth())
				);
			case "years":
				return other.date.getFullYear() - this.date.getFullYear();
			case "hours":
				return Math.floor(diffTime / (1000 * 60 * 60));
			case "minutes":
				return Math.floor(diffTime / (1000 * 60));
			default:
				return 0;
		}
	}

	// Método para obter ou definir o dia da semana
	weekday(day?: number): number | moment {
		if (day === undefined) {
			return this.date.getUTCDay(); // Retorna o dia da semana
		} else {
			if (day < 0 || day > 6) {
				throw new Error("O dia deve estar entre 0 (domingo) e 6 (sábado).");
			}
			const currentDay = this.date.getUTCDay();
			const diff = day - currentDay; // Calcula a diferença
			const newDate = new Date(this.date);
			newDate.setDate(newDate.getDate() + diff); // Ajusta a data
			return new moment(newDate);
		}
	}
}

export default moment;
