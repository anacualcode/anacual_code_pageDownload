//Inicializar conexión con un nombre diferente (clienteSupabase)
const supabaseUrl = 'https://tvajnxvbfqohztivaocx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YWpueHZiZnFvaHp0aXZhb2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NDM3NTcsImV4cCI6MjEwNDExOTc1N30.aduC3sMH02ku8LN_yK3u5vQ_SeE3NdaIGP9PzLH3SvY';
const clienteSupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const btnDescarga = document.getElementById('btn-descarga');
const contadorNumero = document.getElementById('contador-numero');

//Función para obtener el número actual
async function cargarContador() {
    const { data, error } = await clienteSupabase
        .from('contador_descargas')
        .select('cantidad')
        .eq('id', 1)
        .single();

    if (error) {
        console.error('Error al cargar el contador:', error);
        contadorNumero.innerText = 'Error';
    } else if (data) {
        contadorNumero.innerText = data.cantidad;
    }
}

//Función para incrementar el contador
async function registrarDescarga() {
    let valorActual = parseInt(contadorNumero.innerText) || 0;
    contadorNumero.innerText = valorActual + 1;

    const { error } = await clienteSupabase.rpc('incrementar_contador');
    
    if (error) {
        console.error('Error al incrementar en la base de datos:', error);
    }
}

btnDescarga.addEventListener('click', registrarDescarga);
cargarContador();