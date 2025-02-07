// Função para converter timestamp em milissegundos para data e hora formatada
export function converterTimestampParaDataHora(timestamp_ms: number): string {
	// Criando um objeto Date com base no timestamp em milissegundos
	const data = new Date(timestamp_ms);

	// Obtendo os componentes da data e hora
	const ano = data.getUTCFullYear();
	const mes = ("0" + (data.getUTCMonth() + 1)).slice(-2); // Mês começa de 0
	const dia = ("0" + data.getUTCDate()).slice(-2);
	const horas = ("0" + data.getUTCHours()).slice(-2);
	const minutos = ("0" + data.getUTCMinutes()).slice(-2);
	const segundos = ("0" + data.getUTCSeconds()).slice(-2);

	// Formatando a data e hora conforme necessário (YYYY-MM-DD HH:mm:ss)
	const data_hora_formatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

	return data_hora_formatada;
}
