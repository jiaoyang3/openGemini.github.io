import{_ as p,X as u,Y as m,$ as e,a1 as a,Z as n,a0 as s,a3 as t,C as i}from"./framework-1e2d737a.js";const h={},k=t(`<h2 id="create-measurement" tabindex="-1"><a class="header-anchor" href="#create-measurement" aria-hidden="true">#</a> CREATE MEASUREMENT</h2><p>openGemini supports automatic table creation when writing data, but in the following three situations, tables need to be created in advance.</p><h3 id="specify-a-tag-as-partition-key" tabindex="-1"><a class="header-anchor" href="#specify-a-tag-as-partition-key" aria-hidden="true">#</a> Specify a tag as partition key</h3><p>By default, data in openGemini is partition by hash base on time series. However, in some scenarios, users frequently use one or more tags for data query. the hash method distributes the data to different nodes. AS a result, the query fanout is large.<br> If the data can be partitioned according to these frequently used TAGs, then the data with the same TAG value will be stored on the same node, thereby reducing query fan-out and improving data query efficiency.</p><h4 id="specify-a-tag-such-as-location-to-break-up-the-data" tabindex="-1"><a class="header-anchor" href="#specify-a-tag-such-as-location-to-break-up-the-data" aria-hidden="true">#</a> Specify a TAG (such as location) to break up the data</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> MEASUREMENT mst <span class="token keyword">WITH</span> SHARDKEY location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="specify-multiple-tags-such-as-location-region-as-shard-key" tabindex="-1"><a class="header-anchor" href="#specify-multiple-tags-such-as-location-region-as-shard-key" aria-hidden="true">#</a> Specify multiple TAGs (such as location, region) as SHARD KEY</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> MEASUREMENT mst <span class="token keyword">WITH</span> SHARDKEY location，region
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="text-search" tabindex="-1"><a class="header-anchor" href="#text-search" aria-hidden="true">#</a> TEXT SEARCH</h3><p>Text retrieval refers to searching and filtering base on keywords or phrases in text data sets. openGemini supports text retrieval, such as keyword retrieval of logs, which can return all log data containing keywords.</p><p>You need to create a measurement before use it. The purpose of creating a measurement is to specify which Field fields to create a full-text index on, but there is a premise that these fields must be &#39;string&#39; data type</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> MEASUREMENT mst <span class="token keyword">WITH</span> INDEXTYPE <span class="token keyword">text</span> INDEXLIST description<span class="token punctuation">,</span> error_message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Create a measurement named mst and specify to create a full-text index on the two fields <code>description </code>and <code>error_message</code>.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> MEASUREMENT mst <span class="token keyword">WITH</span> INDEXTYPE <span class="token keyword">text</span> INDEXLIST description<span class="token punctuation">,</span> error_message SHARDKEY location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Create a measurement named mst, and specify to create a full-text index on the <code>description</code> and <code>error_message</code> fields, and set <code>location</code> as partition key</p>`,15),b={class:"hint-container tip"},v=e("p",{class:"hint-container-title"},"Tips",-1),g=e("p",null,[a("Full-text indexes will only be created on the fields "),e("code",null,"description"),a(" and "),e("code",null,"error_message"),a(" specified by PRIMARYKEY. If you search keywords in other Fields, it may be slower")],-1),E=e("p",null,[a("It supports exact matching, phrase matching and fuzzy matching on fields "),e("code",null,"description"),a(" and "),e("code",null,"error_message")],-1),y=e("strong",null,"related entries",-1),f=e("p",null,"It is not recommended to create a text index on a TAG, and unforeseeable problems may occur.",-1),_=t(`<h3 id="use-a-high-series-cardinality-storage-engine-hsce" tabindex="-1"><a class="header-anchor" href="#use-a-high-series-cardinality-storage-engine-hsce" aria-hidden="true">#</a> USE A HIGH SERIES CARDINALITY STORAGE ENGINE(HSCE)</h3><p>The traditional time series database has the problem of index expansion due to the large time series, and openGemini&#39;s HSCE solves this problem. When we use it, we need to specify the engine type &#39;columnstore&#39; when creating a measurement. The default storage engine is not HSCE.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> MEASUREMENT mst <span class="token punctuation">(</span>location string field <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> direction string field <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> rtt <span class="token keyword">int</span> field <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">time</span> <span class="token keyword">int</span> field <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token punctuation">)</span> <span class="token keyword">WITH</span> ENGINETYPE <span class="token operator">=</span> columnstore SHARDKEY location <span class="token keyword">TYPE</span> <span class="token keyword">hash</span> PRIMARYKEY location<span class="token punctuation">,</span> direction SORTKEY <span class="token keyword">time</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Create a measurement named mst with four fields <code>location</code>, <code>direction</code>, <code>rtt</code>, <code>time, </code>, and specify the data type and default value respectively. For example, location is a string type, and the default value is an empty string.</p><h4 id="enginetype" tabindex="-1"><a class="header-anchor" href="#enginetype" aria-hidden="true">#</a> ENGINETYPE</h4><p>Required, must be columnstore</p><h4 id="shardkey" tabindex="-1"><a class="header-anchor" href="#shardkey" aria-hidden="true">#</a> SHARDKEY</h4><p>Required, specify <code>location</code> as partition key</p><h4 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> TYPE</h4><p>Required, There are two ways to break up data: hash and range</p><h4 id="primarykey" tabindex="-1"><a class="header-anchor" href="#primarykey" aria-hidden="true">#</a> PRIMARYKEY</h4><p>Required, The primary key is <code>location</code> and <code>direction</code>, which means that the storage engine will create indexes on these two fields.</p><h4 id="sortkey" tabindex="-1"><a class="header-anchor" href="#sortkey" aria-hidden="true">#</a> SORTKEY</h4><p>Required, specify the data sorting method inside the storage engine. <code>time</code> means sorting by time, and can also be changed to <code>rtt</code> or <code>direction</code>, or even other fields in the table.</p><p>When creating measurement, you need to pay attention to:</p><ol><li><p>Must specify all field names, data types, TAG or ordinary field and the default value in case of missing values.</p></li><li><p>If <code>SHARDKEY</code> is not specified, all data will be written to one data node</p></li></ol><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>The traditional inverted index is similar to a dense index with high series cardinality. The index take a lot of memory space, and the query efficiency is low, and it has little effect on data filtering. The openGemini high series cardinality storage engine improves data query efficiency by building sparse indexes.</p><p>For the problem of high series cardinality, openGemini has found a solution, but many functions of openGemini on the new storage engine are not yet perfect and cannot be used in a production environment. For example, it does not support aggregation operators, and the syntax for creating measurement still needs further streamlining, and some exceptions have not been handled yet.</p><p>Welcome to participate and improve the functions together.</p></div><h2 id="show-measurements" tabindex="-1"><a class="header-anchor" href="#show-measurements" aria-hidden="true">#</a> SHOW MEASUREMENTS</h2><p>View the measurements created in the database</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> MEASUREMENTS <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WITH</span> MEASUREMENT <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;measurement_name&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code>is optional。If <code>ON &lt;database_name&gt;</code> is not included in the query, you must specify the database with <code>USE &lt;database_name&gt;</code> in the CLI before, or use the parameter <code>db</code> in the openGemini API request.</p><p>The <code>WITH</code> clause, <code>WHERE</code> clause, <code>LIMIT</code> clause and <code>OFFSET</code> clause are optional. The <code>WHERE</code> clause supports tag comparison; in <code>SHOW MEASUREMENTS</code> queries, field comparison is invalid.</p><p>The operators in <code>WHERE</code> clause are:</p><table><thead><tr><th>Operators</th><th>Description</th></tr></thead><tbody><tr><td><code>=</code></td><td>equal</td></tr><tr><td><code>&lt;&gt;</code></td><td>not equal</td></tr><tr><td><code>!=</code></td><td>not equal</td></tr><tr><td><code>=~</code></td><td>match</td></tr><tr><td><code>!~</code></td><td>not match</td></tr></tbody></table>`,24),w=e("strong",null,"relate entries",-1),T=e("code",null,"FROM",-1),S=e("code",null,"LIMIT、OFFSET",-1),x=t(`<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3><h4 id="show-measurements-with-an-on-clause" tabindex="-1"><a class="header-anchor" href="#show-measurements-with-an-on-clause" aria-hidden="true">#</a> <code>SHOW MEASUREMENTS</code> with an <code>ON</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> MEASUREMENTS <span class="token keyword">ON</span> NOAA_water_database
name: measurements
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> name                <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> average_temperature <span class="token operator">|</span>
<span class="token operator">|</span> h2o_feet            <span class="token operator">|</span>
<span class="token operator">|</span> h2o_pH              <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality         <span class="token operator">|</span>
<span class="token operator">|</span> h2o_temperature     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The database <code>NOAA_water_database</code> has five measurements: <code>average_temperature</code>, <code>h2o_feet</code>, <code>h2o_pH</code>, <code>h2o_quality</code> and <code>h2o_temperature</code>.</p><h4 id="show-measurements-without-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-measurements-without-the-on-clause" aria-hidden="true">#</a> <code>SHOW MEASUREMENTS</code> without the <code>ON</code> clause</h4>`,5),A=e("p",null,[a("use command "),e("code",null,"USE <database_name>"),a(" specified database：")],-1),R=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token operator"},">"),a(` USE NOAA_water_database
Elapsed: 781ns
`),e("span",{class:"token operator"},">"),a(` SHOW MEASUREMENTS
name: measurements
+---------------------+
`),e("span",{class:"token operator"},"|"),a(" name                "),e("span",{class:"token operator"},"|"),a(`
+---------------------+
`),e("span",{class:"token operator"},"|"),a(" average_temperature "),e("span",{class:"token operator"},"|"),a(`
`),e("span",{class:"token operator"},"|"),a(" h2o_feet            "),e("span",{class:"token operator"},"|"),a(`
`),e("span",{class:"token operator"},"|"),a(" h2o_pH              "),e("span",{class:"token operator"},"|"),a(`
`),e("span",{class:"token operator"},"|"),a(" h2o_quality         "),e("span",{class:"token operator"},"|"),a(`
`),e("span",{class:"token operator"},"|"),a(" h2o_temperature     "),e("span",{class:"token operator"},"|"),a(`
+---------------------+
`),e("span",{class:"token number"},"1"),a(" columns, "),e("span",{class:"token number"},"5"),a(" rows "),e("span",{class:"token keyword"},"in"),a(),e("span",{class:"token builtin class-name"},"set"),a(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),q=e("p",null,[a("Use the parameter "),e("code",null,"db"),a(" to specify the database")],-1),M=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token operator"},">"),a(),e("span",{class:"token function"},"curl"),a(),e("span",{class:"token parameter variable"},"-G"),a(),e("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),a(" --data-urlencode "),e("span",{class:"token string"},'"q=SHOW MEASUREMENTS"'),a(`
`),e("span",{class:"token punctuation"},"{"),a(`
    `),e("span",{class:"token string"},'"results"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token punctuation"},"["),a(`
        `),e("span",{class:"token punctuation"},"{"),a(`
            `),e("span",{class:"token string"},'"statement_id"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token number"},"0"),a(`,
            `),e("span",{class:"token string"},'"series"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token punctuation"},"["),a(`
                `),e("span",{class:"token punctuation"},"{"),a(`
                    `),e("span",{class:"token string"},'"name"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token string"},'"measurements"'),a(`,
                    `),e("span",{class:"token string"},'"columns"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token punctuation"},"["),a(`
                        `),e("span",{class:"token string"},'"name"'),a(`
                    `),e("span",{class:"token punctuation"},"]"),a(`,
                    `),e("span",{class:"token string"},'"values"'),e("span",{class:"token builtin class-name"},":"),a(),e("span",{class:"token punctuation"},"["),a(`
                        `),e("span",{class:"token punctuation"},"["),a(`
                            `),e("span",{class:"token string"},'"average_temperature"'),a(`
                        `),e("span",{class:"token punctuation"},"]"),a(`,
                        `),e("span",{class:"token punctuation"},"["),a(`
                            `),e("span",{class:"token string"},'"h2o_feet"'),a(`
                        `),e("span",{class:"token punctuation"},"]"),a(`,
                        `),e("span",{class:"token punctuation"},"["),a(`
                            `),e("span",{class:"token string"},'"h2o_pH"'),a(`
                        `),e("span",{class:"token punctuation"},"]"),a(`,
                        `),e("span",{class:"token punctuation"},"["),a(`
                            `),e("span",{class:"token string"},'"h2o_quality"'),a(`
                        `),e("span",{class:"token punctuation"},"]"),a(`,
                        `),e("span",{class:"token punctuation"},"["),a(`
                            `),e("span",{class:"token string"},'"h2o_temperature"'),a(`
                        `),e("span",{class:"token punctuation"},"]"),a(`
                    `),e("span",{class:"token punctuation"},"]"),a(`
                `),e("span",{class:"token punctuation"},"}"),a(`
            `),e("span",{class:"token punctuation"},"]"),a(`
        `),e("span",{class:"token punctuation"},"}"),a(`
    `),e("span",{class:"token punctuation"},"]"),a(`
`),e("span",{class:"token punctuation"},"}"),a(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),N=t(`<h4 id="show-measurements-with-multiple-clauses" tabindex="-1"><a class="header-anchor" href="#show-measurements-with-multiple-clauses" aria-hidden="true">#</a> <code>SHOW MEASUREMENTS</code> with multiple clauses</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> MEASUREMENTS <span class="token keyword">ON</span> NOAA_water_database <span class="token keyword">WITH</span> MEASUREMENT <span class="token operator">=</span><span class="token operator">~</span> <span class="token operator">/</span>h2o<span class="token punctuation">.</span><span class="token operator">*</span><span class="token operator">/</span>
name: measurements
<span class="token operator">+</span><span class="token comment">-----------------+</span>
<span class="token operator">|</span> name            <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+</span>
<span class="token operator">|</span> h2o_feet        <span class="token operator">|</span>
<span class="token operator">|</span> h2o_pH          <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality     <span class="token operator">|</span>
<span class="token operator">|</span> h2o_temperature <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Return measurements whose names start with <code>h2o</code> in the database <code>NOAA_water_database</code>.</p><h4 id="view-the-number-of-measurements" tabindex="-1"><a class="header-anchor" href="#view-the-number-of-measurements" aria-hidden="true">#</a> View the number of measurements</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> MEASUREMENTS CARDINALITY
TODO

<span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> MEASUREMENTS CARDINALITY <span class="token keyword">ON</span> NOAA_water_database
TODO
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="drop-measurement" tabindex="-1"><a class="header-anchor" href="#drop-measurement" aria-hidden="true">#</a> DROP MEASUREMENT</h2><p>use command <code>DROP MEASUREMENT</code> to delete measurement.</p><p>Deleting a measurement will delete all data and indexes.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> MEASUREMENT <span class="token operator">&lt;</span>measurement_name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="examples-1" tabindex="-1"><a class="header-anchor" href="#examples-1" aria-hidden="true">#</a> Examples</h3><p>Delete the measurement <code>h2o_feet</code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">DROP</span> MEASUREMENT <span class="token string">&quot;h2o_feet&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">Note</p><p>There has no results return when the command &#39;DROP MEASUREMENT&#39; excute success.</p></div><h2 id="alter-measurement" tabindex="-1"><a class="header-anchor" href="#alter-measurement" aria-hidden="true">#</a> ALTER MEASUREMENT</h2><p>##TODO</p>`,15);function O(H,I){const o=i("RouterLink"),r=i("Tabs");return u(),m("div",null,[k,e("div",b,[v,g,E,e("p",null,[y,a(),n(o,{to:"/guide/features/logs.html"},{default:s(()=>[a("Text Search")]),_:1})]),f]),_,e("p",null,[w,a(),n(o,{to:"/guide/query_data/select.html#select"},{default:s(()=>[T,a("clause")]),_:1}),a("、"),n(o,{to:"/guide/query_data/select.html#limit-offset"},{default:s(()=>[S,a("clause")]),_:1})]),x,n(r,{id:"203",data:[{title:"CLI"},{title:"API"}]},{tab0:s(({title:l,value:c,isActive:d})=>[A,R]),tab1:s(({title:l,value:c,isActive:d})=>[q,M]),_:1}),N])}const W=p(h,[["render",O],["__file","measurement.html.vue"]]);export{W as default};
