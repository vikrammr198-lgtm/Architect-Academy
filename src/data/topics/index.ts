import { TopicContent } from '../../types';
import { reverseProxyTopic } from './system-design/reverseProxy';
import { loadBalancingTopic } from './system-design/loadBalancing';
import { cachingTopic } from './system-design/caching';
import { sdFundamentalsAndArchTopics } from './system-design/fundamentalsAndArch';
import { sdLbAndProxyExtraTopics } from './system-design/lbAndProxyExtras';
import { sdDatabasesAndCachingTopics } from './system-design/databasesAndCaching';
import { sdCdnApiMessagingTopics } from './system-design/cdnApiMessaging';
import { sdDistributedPatternsCasesTopics } from './system-design/distributedPatternsCases';

import { osiModelTopic } from './networking/osiModel';
import { tcpHandshakeTopic } from './networking/tcpHandshake';
import { dnsResolutionTopic } from './networking/dnsResolution';
import { netFundamentalsAndModelsTopics } from './networking/fundamentalsAndModels';
import { netIpProtocolsTcpDnsTopics } from './networking/ipProtocolsTcpDns';
import { netRoutingSecurityWebToolsTopics } from './networking/routingSecurityWebTools';

import { systemDesignCategories, networkingCategories } from '../categories';

// 100% Bespoke Hand-Authored Registry covering EVERY single System Design & Networking Topic
export const allTopics: Record<string, TopicContent> = {
  // System Design Core + All 12 Categories
  'reverse-proxy': reverseProxyTopic,
  'load-balancing-fundamentals': loadBalancingTopic,
  'caching-fundamentals': cachingTopic,
  ...sdFundamentalsAndArchTopics,
  ...sdLbAndProxyExtraTopics,
  ...sdDatabasesAndCachingTopics,
  ...sdCdnApiMessagingTopics,
  ...sdDistributedPatternsCasesTopics,

  // Computer Networking Core + All 11 Categories
  'osi-model': osiModelTopic,
  'tcp-three-way-handshake': tcpHandshakeTopic,
  'dns-resolution': dnsResolutionTopic,
  ...netFundamentalsAndModelsTopics,
  ...netIpProtocolsTcpDnsTopics,
  ...netRoutingSecurityWebToolsTopics,
};

export const getTopicById = (id: string): TopicContent => {
  if (allTopics[id]) {
    return allTopics[id];
  }
  return allTopics['reverse-proxy'];
};

export const getAdjacentTopics = (currentId: string) => {
  const current = getTopicById(currentId);
  const categories = current.module === 'system-design' ? systemDesignCategories : networkingCategories;
  const flatTopics: { id: string; title: string; module: 'system-design' | 'networking' }[] = [];

  categories.forEach((cat) => {
    cat.topics.forEach((t) => {
      flatTopics.push({ id: t.id, title: t.title, module: cat.module });
    });
  });

  const currentIndex = flatTopics.findIndex((t) => t.id === currentId);
  const prevTopic = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;

  return { prevTopic, nextTopic };
};
