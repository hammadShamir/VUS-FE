import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorInfoCardProps {
    title: string
    message: string
    onRetry?: () => void
}

export function ErrorInfoCard({ title, message, onRetry }: ErrorInfoCardProps) {
    return (
        <Card className="dark:bg-background dark:border-background shadow-lg w-full max-w-md mx-auto">
            <CardContent className="pt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            </CardContent>
            {onRetry && (
                <CardFooter className="flex justify-end">
                    <Button variant="secondary" onClick={onRetry}>
                        Retry
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

