import{_ as a,X as s,Y as e,a3 as n}from"./framework-1e2d737a.js";const o={},t=n(`<h2 id="create-database-创建数据库" tabindex="-1"><a class="header-anchor" href="#create-database-创建数据库" aria-hidden="true">#</a> CREATE DATABASE (创建数据库)</h2><h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token keyword">WITH</span> <span class="token punctuation">[</span>DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">REPLICATION</span> <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>SHARD DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">INDEX</span> DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>NAME <span class="token operator">&lt;</span>retention<span class="token operator">-</span>policy<span class="token operator">-</span>name<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>CREATE DATABASE</code>需要数据库名称。</p><p><code>WITH</code> ，<code>DURATION</code>，<code>REPLICATION</code>，<code>SHARD DURATION</code>，<code>INDEX DURATION</code>，<code>NAME</code> 子句以及创建与数据库相关联的单个保留策略是可选项。 如果未在<code>WITH</code>之后指定子句，则会默认创建名称为<code>autogen</code>的保留策略。</p><p>成功的<code>CREATE DATABASE</code>查询不返回任何结果。</p><p>如果创建一个已经存在的数据库，openGemini 不执行任何操作，但也不会返回错误。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><ul><li><strong>创建数据库</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该查询创建一个名为 <code>NOAA_water_database</code>的数据库。</p><p>默认情况下，openGemini还会创建默认的保留策略<code>autogen</code>并与数据库<code>NOAA_water_database</code>进行关联。</p><ul><li><strong>创建数据库指定保留策略</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> DURATION <span class="token number">3</span>d <span class="token keyword">REPLICATION</span> <span class="token number">1</span> SHARD DURATION <span class="token number">1</span>h <span class="token keyword">INDEX</span> DURATION <span class="token number">7</span>h NAME <span class="token string">&quot;rp3d&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该操作创建一个名称为<code>NOAA_water_database</code>的数据库。还为<code>NOAA_water_database</code>创建一个保留策略，名称为<code>rp3d</code>，其<code>DURATION</code>为3d，复制因子为1，分片组持续时间为1h，索引组持续时间为7h。</p><h2 id="show-databases-查看数据库" tabindex="-1"><a class="header-anchor" href="#show-databases-查看数据库" aria-hidden="true">#</a> SHOW DATABASES (查看数据库)</h2><p>返回实例上所有数据库的列表。</p><h3 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行 <code>SHOW DATABASES</code> 查询语句</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span>
name: <span class="token keyword">databases</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> name                <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询以表格格式返回数据库名称，这个实例有一个数据库：<code>NOAA_water_database</code>。</p><h2 id="drop-database-删除数据库" tabindex="-1"><a class="header-anchor" href="#drop-database-删除数据库" aria-hidden="true">#</a> DROP DATABASE (删除数据库)</h2><p><code>DROP DATABASE</code>删除数据库，并删除与之关联的所有数据，包括measurement、series、连续查询和保留策略。</p><h3 id="语法-2" tabindex="-1"><a class="header-anchor" href="#语法-2" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-2" tabindex="-1"><a class="header-anchor" href="#示例-2" aria-hidden="true">#</a> 示例</h3><p>删除数据库<code>NOAA_water_database</code>：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>成功的<code>DROP DATABASE</code>命令不返回任何结果。如果删除不存在的数据库，openGemini也不会返回错误。</p>`,31),d=[t];function p(r,c){return s(),e("div",null,d)}const i=a(o,[["render",p],["__file","database.html.vue"]]);export{i as default};
