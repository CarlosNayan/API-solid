/* import { Injectable, HttpException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "src/config/env";

// Configurações do Supabase
const supabaseUrl = env.SUPABASE_API_URL;
const supabaseKey = env.SUPABASE_API_KEY;

@Injectable()
export class SupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(supabaseUrl, supabaseKey);
	}

	// Método para obter o cliente do Supabase
	getSupabaseClient(): SupabaseClient {
		if (!this.supabase) {
			throw new HttpException("Erro na conexão com o Supabase", 500);
		}
		return this.supabase;
	}
}
 */
