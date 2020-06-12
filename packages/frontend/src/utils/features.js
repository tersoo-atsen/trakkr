import devices from '../assets/images/multiple-devices-100.png';
import reports from '../assets/images/business-report-100.png';
import secure from '../assets/images/password-window-100.png';

const features = [{
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

export default features;
