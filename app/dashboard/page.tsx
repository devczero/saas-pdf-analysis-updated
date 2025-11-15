import { RedirectComponent } from "@/components/RedirectComponent"
import DashboardContent from "./_components/DashboardContent"
import { checkAuthenticationAndSubscription } from "@/lib/checkAuthSubscription"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    let redirectTo: string | undefined = undefined
    let hasError = false

    try {
        const authCheck = await checkAuthenticationAndSubscription()
        redirectTo = authCheck.redirectTo
    } catch (error) {
        console.error('Error in Dashboard page:', error)
        hasError = true
    }

    if (hasError) {
        return <RedirectComponent to="/" />
    }

    if (redirectTo) {
        return <RedirectComponent to={redirectTo} />
    }

    return <DashboardContent />
}