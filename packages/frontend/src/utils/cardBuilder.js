import devices from '../assets/images/multiple-devices-100.png';
import reports from '../assets/images/business-report-100.png';
import secure from '../assets/images/password-window-100.png';
import total from '../assets/images/total.png';
import value from '../assets/images/money.png';
import itemCount from '../assets/images/summary-list.png';

export const featureColumns = [
  {
    id: 'devices',
    iconSrc: devices,
    altText: 'Multiple devices',
    title: 'Access items anytime',
    desc: 'Manage your inventory on any computer, tablet or phone.',
  },
  {
    id: 'secure',
    iconSrc: secure,
    altText: 'Activity tracker',
    title: 'Track changes',
    desc: 'Remain secure by always knowing what’s been changed, when and by whom.',
  },
  {
    id: 'reports',
    iconSrc: reports,
    altText: 'Reports tracker',
    title: 'Generate',
    desc: 'Filter & sort your data to generate CSV and PDF reports.',
  },
];

export const summaryColumns = [
  {
    id: 'items',
    iconSrc: itemCount,
    altText: 'Items',
    title: 'Items',
    value: 26,
  },
  {
    id: 'total',
    iconSrc: total,
    altText: 'Total',
    title: 'Total',
    value: 42,
  },
  {
    id: 'value',
    iconSrc: value,
    altText: 'Value',
    title: 'Total Value',
    value: '$14.2K',
  },
];

export const activityList = [
  {
    name: 'Deleted',
    item: 'Bronze Statue',
    attributes: [],
    user: 'Henry Atsen',
    time: '08:34pm',
  },
  {
    name: 'Updated',
    item: 'Ivory Statue',
    attributes: ['Name', 'Image'],
    user: 'Henry Atsen',
    time: '08:14pm',
  },
  {
    name: 'Updated',
    item: 'Ivory Statue',
    attributes: ['Quantity'],
    user: 'Henry Atsen',
    time: '05:07pm',
  },
  {
    name: 'Updated',
    item: 'Ivory Statue',
    attributes: ['Value'],
    user: 'Henry Atsen',
    time: '05:07pm',
  },
  {
    name: 'Created',
    item: 'Ivory Statue',
    attributes: [],
    user: 'Henry Atsen',
    time: '06:30am',
  },
];
