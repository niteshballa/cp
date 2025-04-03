"use client"

import { useState } from "react"
import { CustomersTable } from "@/components/pages/customers/customers-table"
import { CustomersFilter } from "@/components/pages/customers/customers-filter"
import { PageContainer } from "@/components/ui/page-container"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  return (
    <PageContainer className="bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <div className="mb-4 relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 w-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border border-border/50 shadow-md bg-card/90 backdrop-blur-sm overflow-hidden">
          <CustomersFilter statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
          <CustomersTable searchQuery={searchQuery} statusFilter={statusFilter} />
        </Card>
      </motion.div>
    </PageContainer>
  )
}

