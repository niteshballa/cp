"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/pages/settings/account-settings"
import { NotificationSettings } from "@/components/pages/settings/notification-settings"
import { SecuritySettings } from "@/components/pages/settings/security-settings"
import { BillingSettings } from "@/components/pages/settings/billing-settings"
import { motion } from "framer-motion"

export function SettingsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageContainer className="bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>

      <Tabs defaultValue="account" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TabsList className="mb-4 bg-background/50 backdrop-blur-sm p-1 rounded-xl border border-border/50">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              Billing
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show">
          <TabsContent value="account">
            <motion.div variants={item}>
              <AccountSettings />
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications">
            <motion.div variants={item}>
              <NotificationSettings />
            </motion.div>
          </TabsContent>

          <TabsContent value="security">
            <motion.div variants={item}>
              <SecuritySettings />
            </motion.div>
          </TabsContent>

          <TabsContent value="billing">
            <motion.div variants={item}>
              <BillingSettings />
            </motion.div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </PageContainer>
  )
}

