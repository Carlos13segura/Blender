function mostrarToast() {
    const toast = document.getElementById("toast");
    
    toast.classList.add("toast-show");

    // Auto cerrar en 3 segundos
    setTimeout(() => {
        toast.classList.remove("toast-show");
    }, 3000);
}
