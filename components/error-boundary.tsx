"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Don't set error state for redirect errors
    if (error && (error.toString().includes("Redirect") || error.name === "Redirect")) {
      console.log("Redirect error caught - this is expected behavior")
      return { hasError: false, error: null, errorInfo: null }
    }

    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Don't set error state for redirect errors
    if (error && (error.toString().includes("Redirect") || error.name === "Redirect")) {
      console.log("Redirect error caught - this is expected behavior")
      return
    }

    this.setState({ error, errorInfo })

    // Log error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  private handleGoHome = (): void => {
    window.location.href = "/"
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangleIcon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Something went wrong</CardTitle>
                  <CardDescription>An unexpected error has occurred</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 text-sm overflow-auto max-h-[200px]">
                <p className="font-mono">{this.state.error?.toString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" onClick={this.handleGoHome} className="flex-1">
                <HomeIcon className="mr-2 h-4 w-4" />
                Go Home
              </Button>
              <Button onClick={this.handleReload} className="flex-1">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Reload Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

