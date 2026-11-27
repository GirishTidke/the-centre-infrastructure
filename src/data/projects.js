const imageRoot = '/wp-content/themes/urban-architects/assets/projects/';

export const projects = [
  { id: 'horizon-business-park', category: 'Commercial', name: 'Horizon Business Park', location: 'Pune, Maharashtra', year: '2025', area: '42,000 sq ft', image: 'bel-entrance.jpg', gallery: ['bel-entrance.jpg', 'balaji-papanna.jpg', 'felix.jpg'] },
  { id: 'aurora-villa', category: 'Residential', name: 'Aurora Villa', location: 'Nagpur, Maharashtra', year: '2024', area: '4,200 sq ft', image: 'ashwin-puja.jpg', gallery: ['ashwin-puja.jpg', 'priyadarshi.jpg', 'krishanu.jpg'] },
  { id: 'steelcore-warehouse', category: 'Industrial', name: 'Steelcore Warehouse', location: 'Nashik, Maharashtra', year: '2024', area: '60,000 sq ft', image: 'balaji-papanna.jpg', gallery: ['balaji-papanna.jpg', 'avinash-patil.jpg', 'nerlat-four-winds.jpg'] },
  { id: 'greenfield-residency', category: 'Residential', name: 'Greenfield Residency', location: 'Hyderabad, Telangana', year: '2023', area: '18,500 sq ft', image: 'hbr-apartments.jpg', gallery: ['hbr-apartments.jpg', 'hennur-apartment.jpg', 'nandhi-hills-township.jpg'] },
  { id: 'metro-square', category: 'Commercial', name: 'Metro Square Retail Plaza', location: 'Bengaluru, Karnataka', year: '2023', area: '25,000 sq ft', image: 'felix.jpg', gallery: ['felix.jpg', 'bel-entrance.jpg', 'sangam-mess.jpg'] },
  { id: 'nova-logistics-hub', category: 'Industrial', name: 'Nova Logistics Hub', location: 'Aurangabad, Maharashtra', year: '2022', area: '85,000 sq ft', image: 'nerlat-four-winds.jpg', gallery: ['nerlat-four-winds.jpg', 'avinash-patil.jpg', 'balaji-papanna.jpg'] },
];

export const projectImage = (file) => `${imageRoot}${file}`;
