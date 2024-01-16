import{_ as s,X as n,Y as a,a3 as e}from"./framework-1e2d737a.js";const t="/assets/downsample_1-c964b51b.jpg",p={},o=e('<p><strong>背景介绍</strong> 在DevOps或Iot等场景中，用户对近期数据更敏感，很多时候只需要对近期指定数据进行完整的数据查询，而对较久远的数据仅进行数据趋势查询，即采样数据的查询，因此对久远的低价值数据，我们可以通过降采样的方式进行数据的采样缩放。</p><p><strong>降采样</strong> 降采样即一定时间间隔内的数据点，基于一定规则，聚合为一个或一组值，从而达到降低采样点数，减少整体存储数据量，进而减轻存储和查询计算的压力。</p><p><strong>多级降采样</strong> 多级降采样与普通降采样的区别在于，多级降采样可以对不同时间段的数据进行不同的降采样策略。 实际业务中用户对不同时间段的降采样要求是不一样的，用户可能对近期的数据比较敏感而对长远的数据需求较少，所以需要根据实际业务对数据进行不同的多级降采样策略。采用多级降采样的方式既满足了用户对高价值数据的查询需求，又兼顾了存储效率。</p><p><strong>场景举例</strong> 多重降采样场景举例：7天内原始数据直接入库，7-30天数据，15min粒度降采样后入库，30天-12个月的数据，1h粒度降采样后入库。 如下图所示，假设今天是2022-12-31，蓝色部分是7天内的数据，黄色部分是7-30天数据，橙色部分是30天-12个月的数据。每过一段时间，数据库会把蓝色部分的数据以15min为粒度聚合放到黄色区域中；每过一段时间，数据库会把黄色部分以1h为粒度聚合放到橙色区域中，注意这里1h是15min的倍数，所以可以方便地聚合。 <img src="'+t+`" alt="多级降采样场景图" loading="lazy"></p><h2 id="创建降采样" tabindex="-1"><a class="header-anchor" href="#创建降采样" aria-hidden="true">#</a> 创建降采样</h2><p><strong>语法：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Create</span> DownSample <span class="token punctuation">[</span><span class="token keyword">on</span> <span class="token operator">&lt;</span>rp_name<span class="token operator">&gt;</span><span class="token operator">|</span> <span class="token keyword">on</span> <span class="token operator">&lt;</span>dbname<span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token operator">&lt;</span>rp_name<span class="token operator">&gt;</span><span class="token operator">|</span>  <span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">(</span>dataType<span class="token punctuation">(</span>aggregators<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">With</span> Duration <span class="token operator">&lt;</span>timeDuration<span class="token operator">&gt;</span> SampleInterval<span class="token punctuation">(</span><span class="token keyword">time</span> Durations<span class="token punctuation">)</span> TimeInterval<span class="token punctuation">(</span><span class="token keyword">time</span> Durations<span class="token punctuation">)</span> WaterMark<span class="token punctuation">(</span><span class="token keyword">time</span> Durations<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p><table><thead><tr><th>Duration</th><th>SampleInterval</th><th>TimeInterval</th><th>WaterMark</th></tr></thead><tbody><tr><td>数据保留时间</td><td>执行下一级降采样时间</td><td>采样Interval</td><td>采样滞后时间</td></tr></tbody></table><p><strong>聚合方法定义格式：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>dataType<span class="token punctuation">(</span>aggfunctions<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>聚合方法举例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">int</span><span class="token punctuation">(</span><span class="token keyword">first</span><span class="token punctuation">,</span>sum<span class="token punctuation">,</span>count<span class="token punctuation">,</span><span class="token keyword">last</span><span class="token punctuation">,</span>min<span class="token punctuation">,</span>max<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">int</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span>max<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">float</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>限制说明：</strong></p><ul><li>SampleInterval，TimeInterval，WaterMark指定的采样策略数量必须相同，比如其中有一项的数量是3，其他两项的数量也必须是3；</li><li>SampleInterval、 TimeInterval、WaterMark为一一对应关系、每个数组内为倍数关系；</li></ul><p><strong>举例说明：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token keyword">Create</span> DownSample 
 <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">(</span>sum<span class="token punctuation">,</span><span class="token keyword">last</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">integer</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span>min<span class="token punctuation">)</span><span class="token punctuation">)</span>
 <span class="token keyword">With</span> Duration <span class="token number">7</span>d 
 sampleinterval<span class="token punctuation">(</span><span class="token number">1</span>d<span class="token punctuation">,</span><span class="token number">2</span>d<span class="token punctuation">)</span>
 timeinterval<span class="token punctuation">(</span><span class="token number">1</span>m<span class="token punctuation">,</span><span class="token number">3</span>m<span class="token punctuation">)</span>
 watermark<span class="token punctuation">(</span><span class="token number">1</span>s<span class="token punctuation">,</span><span class="token number">10</span>s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Duration是7d,说明这个降采样数据保存最长是7d，这里的Duration需要小于指定的RP的Duration。</p><p>1d内的数据采样间隔为1m，1d至2d内的数据采样为3m，采样滞后分别为1s和10s。这里(1d,1m,1s)和(2d,3m,10s)两个元组相对应，同时2d是1d的倍数，3m是1m的倍数，10s是1s的倍数，符合限制条件。</p><p>采样聚合数据为sum，last，max，min。float(sum,last)代表sum和last聚合数据是float格式，integer(max,min)代表max和min聚合数据是integer格式。</p><h2 id="显示降采样" tabindex="-1"><a class="header-anchor" href="#显示降采样" aria-hidden="true">#</a> 显示降采样</h2><p><strong>语法：</strong> show 默认database 所有 downsample tasks：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> DOWNSAMPLES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>show 指定database 所有 downsample tasks:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> DOWNSAMPLES <span class="token keyword">ON</span> <span class="token operator">&lt;</span>dtabase name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>举例说明：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">show</span> downsamples <span class="token keyword">on</span> db0
rpName  field_operator                   duration  sampleInterval    timeInterval waterMark
<span class="token comment">------  --------------                   --------  --------------    ------------ ---------</span>
autogen <span class="token keyword">float</span>{sum<span class="token punctuation">,</span><span class="token keyword">last</span>}<span class="token punctuation">,</span><span class="token keyword">integer</span>{max<span class="token punctuation">,</span>min} <span class="token number">168</span>h0m0s  <span class="token number">24</span>h0m0s<span class="token punctuation">,</span><span class="token number">48</span>h0m0s   <span class="token number">1</span>m0s<span class="token punctuation">,</span><span class="token number">3</span>m0s    <span class="token number">1</span>s<span class="token punctuation">,</span><span class="token number">10</span>s
rp1     <span class="token keyword">float</span>{sum<span class="token punctuation">,</span><span class="token keyword">last</span>}<span class="token punctuation">,</span><span class="token keyword">integer</span>{max<span class="token punctuation">,</span>min} <span class="token number">720</span>h0m0s  <span class="token number">24</span>h0m0s<span class="token punctuation">,</span><span class="token number">168</span>h0m0s  <span class="token number">1</span>m0s<span class="token punctuation">,</span><span class="token number">3</span>m0s    <span class="token number">1</span>s<span class="token punctuation">,</span><span class="token number">1</span>m0s
rp2     <span class="token keyword">bool</span>{<span class="token keyword">last</span>}<span class="token punctuation">,</span><span class="token keyword">int</span>{max<span class="token punctuation">,</span>min<span class="token punctuation">,</span><span class="token keyword">first</span>}    <span class="token number">2400</span>h0m0s <span class="token number">168</span>h0m0s<span class="token punctuation">,</span><span class="token number">360</span>h0m0s <span class="token number">30</span>m0s<span class="token punctuation">,</span><span class="token number">1</span>h0m0s <span class="token number">10</span>m0s<span class="token punctuation">,</span><span class="token number">10</span>h0m0s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除降采样" tabindex="-1"><a class="header-anchor" href="#删除降采样" aria-hidden="true">#</a> 删除降采样</h2><p><strong>语法：</strong> 删除数据库的所有降采样：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Drop</span> DownSamples
<span class="token keyword">Drop</span> DownSamples <span class="token keyword">on</span> db0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>删除指定RP的降采样：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Drop</span> DownSample <span class="token keyword">on</span> rp1
<span class="token keyword">Drop</span> DownSample <span class="token keyword">on</span> db<span class="token punctuation">.</span>rp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,33),l=[o];function c(i,r){return n(),a("div",null,l)}const d=s(p,[["render",c],["__file","downsample.html.vue"]]);export{d as default};
