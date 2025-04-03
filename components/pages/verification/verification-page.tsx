"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheckIcon, FileTextIcon, CheckIcon, AlertCircleIcon } from "lucide-react"

export function VerificationPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Verification</h1>
          <p className="text-muted-foreground">Complete verification to unlock all features</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Business Information</p>
                    <p className="text-sm text-muted-foreground">Basic business details verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Owner Verification</p>
                    <p className="text-sm text-muted-foreground">Identity verification required</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Account Verification</p>
                    <p className="text-sm text-muted-foreground">Bank account verification required</p>
                  </div>
                </div>
                <Button asChild>
                  <a href="/verification/kyc">Complete KYC</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-purple-500" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Business Registration</p>
                    <p className="text-sm text-muted-foreground">Upload business registration documents</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Tax Documents</p>
                    <p className="text-sm text-muted-foreground">Upload tax identification documents</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Address Proof</p>
                    <p className="text-sm text-muted-foreground">Upload address verification documents</p>
                  </div>
                </div>
                <Button asChild>
                  <a href="/verification/documents">Upload Documents</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

