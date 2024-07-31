import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchLatestInvoices, fetchCardData, fetchRevenue } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton,   CardsSkeleton, } from '../ui/skeletons';
import RevenueChart from '../ui/dashboard/revenue-chart';

export default  async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  const revenue = await fetchRevenue();
  console.log(revenue);
  return  <main>
    <h1 className='mb-4 text-xl md:text-2xl'>
      Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        <Card title="Collected" value={totalPaidInvoices} type="collected" /> 
       <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
  </main>
  }