// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AutoRetriesChart } from "./auto-retries-chart"

// const DashboardContent = () => {
//   // Add state to track unseen data in tabs
//   const [unseenTabs, setUnseenTabs] = useState<Record<string, boolean>>({
//     analytics: true, // Set this tab to have unseen data initially
//     ledger: true,
//   })

//   return (
//     <Tabs
//       defaultValue="overview"
//       className="space-y-4"
//       id="dashboard-tabs"
//       onValueChange={(value) => {
//         // Mark the tab as seen when it's clicked
//         if (unseenTabs[value]) {
//           setUnseenTabs((prev) => ({
//             ...prev,
//             [value]: false,
//           }))
//         }
//       }}
//     >
//       <div className="flex items-center justify-between">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="analytics" className="relative">
//             Analytics
//             {unseenTabs["analytics"] && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />}
//           </TabsTrigger>
//           <TabsTrigger value="ledger" className="relative">
//             Ledger
//             {unseenTabs["ledger"] && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />}
//           </TabsTrigger>
//         </TabsList>
//       </div>
//       <TabsContent value="overview">
//         <p>Overview content</p>
//         <AutoRetriesChart />
//       </TabsContent>
//       <TabsContent value="analytics">
//         <p>Analytics content</p>
//       </TabsContent>
//       <TabsContent value="ledger">
//         <p>Ledger content</p>
//       </TabsContent>
//     </Tabs>
//   )
// }

// export default DashboardContent

