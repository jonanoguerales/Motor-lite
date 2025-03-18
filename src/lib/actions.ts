"use server"

import { revalidatePath } from "next/cache"

// Nuevo tipo para el formulario de venta de coches
export type SellCarFormData = {
  name: string
  email: string
  phone: string
  brand: string
  model: string
  year: string
  kilometers: string
  fuel: string
  comments?: string
}

/**
 * Server Action para procesar el formulario de venta de coches
 */
export async function submitSellCarForm(formData: SellCarFormData): Promise<{ success: boolean; message: string }> {
  try {
    console.log("Procesando formulario de venta:", formData)

    // Validación básica de datos
    if (!formData.name || !formData.email || !formData.phone || !formData.brand || !formData.model) {
      return {
        success: false,
        message: "Por favor, completa todos los campos obligatorios",
      }
    }

    // Aquí iría la lógica para guardar en base de datos
    // Por ejemplo: await db.sellRequests.create({ data: formData })

    // Enviar email de notificación
    await sendEmailNotification(formData)

    // Enviar email de confirmación al cliente
    await sendConfirmationEmail(formData)

    // Revalidar la página para actualizar cualquier dato en caché
    revalidatePath("/vender-mi-coche")

    return {
      success: true,
      message: "Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.",
    }
  } catch (error) {
    console.error("Error al procesar el formulario:", error)
    return {
      success: false,
      message: "Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
    }
  }
}

/**
 * Función para enviar email de notificación al concesionario
 */
async function sendEmailNotification(formData: SellCarFormData): Promise<void> {
  // Esta es una implementación simulada
  // En un entorno real, usarías un servicio de email como SendGrid, Mailgun, etc.

  console.log("Enviando email de notificación al concesionario")
  console.log("Asunto: Nueva solicitud de valoración de vehículo")
  console.log("Contenido:", {
    clientName: formData.name,
    clientEmail: formData.email,
    clientPhone: formData.phone,
    vehicleDetails: `${formData.brand} ${formData.model} (${formData.year}) - ${formData.kilometers}km - ${formData.fuel}`,
    comments: formData.comments || "No hay comentarios adicionales",
  })

  // Simular delay de envío
  await new Promise((resolve) => setTimeout(resolve, 500))
}

/**
 * Función para enviar email de confirmación al cliente
 */
async function sendConfirmationEmail(formData: SellCarFormData): Promise<void> {
  // Esta es una implementación simulada

  console.log("Enviando email de confirmación al cliente")
  console.log("Destinatario:", formData.email)
  console.log("Asunto: Hemos recibido tu solicitud de valoración")
  console.log("Contenido:", {
    name: formData.name,
    message: `Gracias por contactar con nosotros para la valoración de tu ${formData.brand} ${formData.model}. 
    Un asesor se pondrá en contacto contigo en las próximas 24 horas para ofrecerte una valoración personalizada.`,
  })

  // Simular delay de envío
  await new Promise((resolve) => setTimeout(resolve, 500))
}

