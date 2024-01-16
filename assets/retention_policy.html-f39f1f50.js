import{_ as c,X as p,Y as d,Z as i,a0 as n,a3 as e,C as u,$ as s,a1 as a}from"./framework-1e2d737a.js";const k={},m=e(`<h2 id="create-retention-policy-创建数据保留策略" tabindex="-1"><a class="header-anchor" href="#create-retention-policy-创建数据保留策略" aria-hidden="true">#</a> CREATE RETENTION POLICY(创建数据保留策略)</h2><h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> RETENTION POLICY <span class="token operator">&lt;</span>retention_policy_name<span class="token operator">&gt;</span> <span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span> DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span> <span class="token keyword">REPLICATION</span> <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> <span class="token punctuation">[</span>SHARD DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">INDEX</span> DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">DEFAULT</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="duration" tabindex="-1"><a class="header-anchor" href="#duration" aria-hidden="true">#</a> DURATION</h4><p><code>DURATION</code>子句确定openGemini将数据保留多长时间。 保留策略的最短持续时间为一小时，最长持续时间为无限。</p><h4 id="replication" tabindex="-1"><a class="header-anchor" href="#replication" aria-hidden="true">#</a> REPLICATION</h4><p><code>REPLICATION</code>子句确定每个数据点在集群中存储了多少个独立副本，目前仅支持<code>1</code>副本。</p><h4 id="shard-duration" tabindex="-1"><a class="header-anchor" href="#shard-duration" aria-hidden="true">#</a> SHARD DURATION</h4><ul><li>可选项， <code>SHARD DURATION</code> 子句确定分片组的时间范围。</li><li>默认情况下，分片组的持续时间由保留策略的<code>DURATION</code>确定：</li></ul><table><thead><tr><th>保留策略期限</th><th>分片组持续时间</th></tr></thead><tbody><tr><td>&lt; 2 days</td><td>1 hour</td></tr><tr><td>&gt;= 2 days and &lt;= 6 months</td><td>1 day</td></tr><tr><td>&gt; 6 months</td><td>7 days</td></tr></tbody></table><p>最小允许的 <code>SHARD GROUP DURATION</code> 为<code>1h</code>. 如果 <code>创建保留策略</code> 查询试图将 <code>SHARD GROUP DURATION</code> 设置为小于 <code>1h</code> 且大于 <code>0s</code>, openGemini 会自动的将 <code>SHARD GROUP DURATION</code> 设置为 <code>1h</code>. 如果 <code>CREATE RETENTION POLICY</code> 查询试图将 <code>SHARD GROUP DURATION</code> 设置为你 <code>0s</code>, openGemini 会根据上面列出的默认自动设置<code>SHARD GROUP DURATION</code></p><h4 id="index-duration" tabindex="-1"><a class="header-anchor" href="#index-duration" aria-hidden="true">#</a> INDEX DURATION</h4><ul><li>可选项，<code>INDEX DURATION</code> 子句确定索引组的时间范围。</li></ul><h4 id="default" tabindex="-1"><a class="header-anchor" href="#default" aria-hidden="true">#</a> DEFAULT</h4><p>将新的保留策略设置为数据库的默认保留策略。此设置是可选项。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><ul><li><strong>创建保留策略</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> RETENTION POLICY <span class="token string">&quot;one_day_only&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> DURATION <span class="token number">1</span>d <span class="token keyword">REPLICATION</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该查询为数据库<code>NOAA_water_database</code>创建了一个名为<code>one_day_only</code>的保留策略，该策略的期限为<code>1d</code>，复制因子为<code>1</code>。</p><ul><li><strong>创建默认保留策略</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> RETENTION POLICY <span class="token string">&quot;one_day_only&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> DURATION <span class="token number">24</span>h <span class="token keyword">REPLICATION</span> <span class="token number">1</span> <span class="token keyword">DEFAULT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该查询创建与上例相同的保留策略，但是将其设置为数据库的默认保留策略。</p><ul><li><strong>创建数据不过期的保留策略</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> RETENTION POLICY <span class="token string">&quot;never_expire&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> DURATION <span class="token number">0</span>s <span class="token keyword">REPLICATION</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该查询为数据库<code>NOAA_water_database</code>创建了一个名为<code>never_expire</code>的保留策略，该策略的下的数据是不会过期的。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>成功的<code>CREATE RETENTION POLICY</code>查询不返回任何结果。</p><p>如果尝试创建与现有策略相同的保留策略，则openGemini不会返回错误。 如果尝试创建与现有保留策略相同名称的保留策略，但属性不同，则openGemini将返回错误。</p><p>请参阅 <a href="./database">数据库操作</a></p></div><h2 id="show-retention-policies-查看数据保留策略" tabindex="-1"><a class="header-anchor" href="#show-retention-policies-查看数据保留策略" aria-hidden="true">#</a> SHOW RETENTION POLICIES(查看数据保留策略)</h2><p>返回指定数据库的<strong>保留策略</strong>列表。</p><h3 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> RETENTION POLICIES <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code>是可选项。如果查询中没有包含<code>ON &lt;database_name&gt;</code>，您必须在CLI中使用<code>USE &lt;database_name&gt;</code>指定数据库，或者在openGemini API请求中使用参数<code>db</code>指定数据库。</p><h3 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行带有<code>ON</code>子句的<code>SHOW RETENTION POLICIES</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> RETENTION POLICIES <span class="token keyword">ON</span> NOAA_water_database
<span class="token operator">+</span><span class="token comment">---------+----------+--------------------+--------------+---------------+----------------+----------+---------+</span>
<span class="token operator">|</span> name    <span class="token operator">|</span> duration <span class="token operator">|</span> shardGroupDuration <span class="token operator">|</span> hot duration <span class="token operator">|</span> warm duration <span class="token operator">|</span> <span class="token keyword">index</span> duration <span class="token operator">|</span> replicaN <span class="token operator">|</span> <span class="token keyword">default</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+----------+--------------------+--------------+---------------+----------------+----------+---------+</span>
<span class="token operator">|</span> autogen <span class="token operator">|</span> <span class="token number">0</span>s       <span class="token operator">|</span> <span class="token number">168</span>h0m0s           <span class="token operator">|</span> <span class="token number">0</span>s           <span class="token operator">|</span> <span class="token number">0</span>s            <span class="token operator">|</span> <span class="token number">168</span>h0m0s       <span class="token operator">|</span> <span class="token number">1</span>        <span class="token operator">|</span> <span class="token boolean">true</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+----------+--------------------+--------------+---------------+----------------+----------+---------+</span>
<span class="token number">8</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询以表格的形式返回数据库<code>NOAA_water_database</code>中所有的保留策略。这个数据库有一个名为<code>autogen</code>的保留策略，该保留策略具有无限的持续时间，为期7天的shard group持续时间，复制系数为1，并且它是这个数据库的默认(<code>DEFAULT</code>)保留策略。</p><ul><li><strong>运行不带有<code>ON</code>子句的<code>SHOW RETENTION POLICIES</code>查询</strong></li></ul>`,36),h=s("p",null,[a("使用"),s("code",null,"USE <database_name>"),a("指定数据库")],-1),b=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),a(` use NOAA_water_database
`),s("span",{class:"token operator"},">"),a(` SHOW RETENTION POLICIES
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
`),s("span",{class:"token operator"},"|"),a(" name    "),s("span",{class:"token operator"},"|"),a(" duration "),s("span",{class:"token operator"},"|"),a(" shardGroupDuration "),s("span",{class:"token operator"},"|"),a(" hot duration "),s("span",{class:"token operator"},"|"),a(" warm duration "),s("span",{class:"token operator"},"|"),a(" index duration "),s("span",{class:"token operator"},"|"),a(" replicaN "),s("span",{class:"token operator"},"|"),a(" default "),s("span",{class:"token operator"},"|"),a(`
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
`),s("span",{class:"token operator"},"|"),a(" autogen "),s("span",{class:"token operator"},"|"),a(" 0s       "),s("span",{class:"token operator"},"|"),a(" 168h0m0s           "),s("span",{class:"token operator"},"|"),a(" 0s           "),s("span",{class:"token operator"},"|"),a(" 0s            "),s("span",{class:"token operator"},"|"),a(" 168h0m0s       "),s("span",{class:"token operator"},"|"),a(),s("span",{class:"token number"},"1"),a("        "),s("span",{class:"token operator"},"|"),a(),s("span",{class:"token boolean"},"true"),a("    "),s("span",{class:"token operator"},"|"),a(`
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
`),s("span",{class:"token number"},"8"),a(" columns, "),s("span",{class:"token number"},"1"),a(" rows "),s("span",{class:"token keyword"},"in"),a(),s("span",{class:"token builtin class-name"},"set"),a(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),v=s("p",null,[a("使用参数"),s("code",null,"db"),a("指定数据库")],-1),O=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),a(),s("span",{class:"token function"},"curl"),a(),s("span",{class:"token parameter variable"},"-G"),a(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),a(" --data-urlencode "),s("span",{class:"token string"},'"q=SHOW RETENTION POLICIES"'),a(`

`),s("span",{class:"token punctuation"},"{"),a(`
    `),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),a(),s("span",{class:"token punctuation"},"["),a(`
        `),s("span",{class:"token punctuation"},"{"),a(`
            `),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),a(),s("span",{class:"token number"},"0"),a(`,
            `),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),a(),s("span",{class:"token punctuation"},"["),a(`
                `),s("span",{class:"token punctuation"},"{"),a(`
                    `),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),a(),s("span",{class:"token punctuation"},"["),a(`
                        `),s("span",{class:"token string"},'"name"'),a(`,
                        `),s("span",{class:"token string"},'"duration"'),a(`,
                        `),s("span",{class:"token string"},'"shardGroupDuration"'),a(`,
                        `),s("span",{class:"token string"},'"hot duration"'),a(`,
                        `),s("span",{class:"token string"},'"warm duration"'),a(`,
                        `),s("span",{class:"token string"},'"index duration"'),a(`,
                        `),s("span",{class:"token string"},'"replicaN"'),a(`,
                        `),s("span",{class:"token string"},'"default"'),a(`
                    `),s("span",{class:"token punctuation"},"]"),a(`,
                    `),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),a(),s("span",{class:"token punctuation"},"["),a(`
                        `),s("span",{class:"token punctuation"},"["),a(`
                            `),s("span",{class:"token string"},'"autogen"'),a(`,
                            `),s("span",{class:"token string"},'"0s"'),a(`,
                            `),s("span",{class:"token string"},'"168h0m0s"'),a(`,
                            `),s("span",{class:"token string"},'"0s"'),a(`,
                            `),s("span",{class:"token string"},'"0s"'),a(`,
                            `),s("span",{class:"token string"},'"168h0m0s"'),a(`,
                            `),s("span",{class:"token number"},"1"),a(`,
                            `),s("span",{class:"token boolean"},"true"),a(`
                        `),s("span",{class:"token punctuation"},"]"),a(`
                    `),s("span",{class:"token punctuation"},"]"),a(`
                `),s("span",{class:"token punctuation"},"}"),a(`
            `),s("span",{class:"token punctuation"},"]"),a(`
        `),s("span",{class:"token punctuation"},"}"),a(`
    `),s("span",{class:"token punctuation"},"]"),a(`
`),s("span",{class:"token punctuation"},"}"),a(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),g=e(`<h2 id="alter-retention-policy-修改数据保留策略" tabindex="-1"><a class="header-anchor" href="#alter-retention-policy-修改数据保留策略" aria-hidden="true">#</a> ALTER RETENTION POLICY(修改数据保留策略)</h2><h3 id="语法-2" tabindex="-1"><a class="header-anchor" href="#语法-2" aria-hidden="true">#</a> 语法</h3><p><code>ALTER RETENTION POLICY</code>语法如下，必须声明至少一个保留策略属性<code>DURATION</code>，<code>REPLICATION</code>，<code>SHARD DURATION</code>或<code>DEFAULT</code>：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ALTER</span> RETENTION POLICY <span class="token operator">&lt;</span>retention_policy_name<span class="token operator">&gt;</span> <span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span> DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span> <span class="token keyword">REPLICATION</span> <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> SHARD DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span> <span class="token keyword">DEFAULT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>复制因子 <code>REPLICATION &lt;n&gt;</code> 仅支持 1</p></div><h3 id="示例-2" tabindex="-1"><a class="header-anchor" href="#示例-2" aria-hidden="true">#</a> 示例</h3><p>首先，以2d的<code>DURATION</code>创建保留策略<code>what_is_time</code>：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> RETENTION POLICY <span class="token string">&quot;what_is_time&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> DURATION <span class="token number">2</span>d <span class="token keyword">REPLICATION</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改<code>what_is_time</code>以使其具有三周的<code>DURATION</code>，两个小时的分片组持续时间，并使其成为<code>NOAA_water_database</code>的<code>DEFAULT</code>保留策略。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">ALTER</span> RETENTION POLICY <span class="token string">&quot;what_is_time&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> DURATION <span class="token number">3</span>w SHARD DURATION <span class="token number">2</span>h <span class="token keyword">DEFAULT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在最后一个示例中，<code> what_is_time</code>保留其原始复制因子<code>1</code>。</p><p>成功的<code>ALTER RETENTION POLICY</code>查询不返回任何结果。</p><h2 id="drop-retention-policy-删除数据保留策略" tabindex="-1"><a class="header-anchor" href="#drop-retention-policy-删除数据保留策略" aria-hidden="true">#</a> DROP RETENTION POLICY(删除数据保留策略)</h2><div class="hint-container danger"><p class="hint-container-title">警告</p><p>删除保留策略将永久删除使用该保留策略的所有measurement和数据</p></div><h3 id="语法-3" tabindex="-1"><a class="header-anchor" href="#语法-3" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> RETENTION POLICY <span class="token operator">&lt;</span>retention_policy_name<span class="token operator">&gt;</span> <span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-3" tabindex="-1"><a class="header-anchor" href="#示例-3" aria-hidden="true">#</a> 示例</h3><p>在<code>NOAA_water_database</code>数据库中删除保留策略<code>what_is_time</code>：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">DROP</span> RETENTION POLICY <span class="token string">&quot;what_is_time&quot;</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>成功执行<code>DROP RETENTION POLICY</code>不返回任何结果。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果尝试删除不存在的保留策略，openGemini也不会返回错误。</p></div>`,21);function N(T,I){const t=u("Tabs");return p(),d("div",null,[m,i(t,{id:"172",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:n(({title:o,value:l,isActive:r})=>[h,b]),tab1:n(({title:o,value:l,isActive:r})=>[v,O]),_:1}),g])}const E=c(k,[["render",N],["__file","retention_policy.html.vue"]]);export{E as default};
