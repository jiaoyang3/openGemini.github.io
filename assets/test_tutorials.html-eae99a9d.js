import{_ as i,X as o,Y as r,$ as t,a1 as e,Z as s,a3 as n,C as l}from"./framework-1e2d737a.js";const d={},c=n(`<h1 id="test-tutorials" tabindex="-1"><a class="header-anchor" href="#test-tutorials" aria-hidden="true">#</a> Test Tutorials</h1><h2 id="how-to-run-unit-tests" tabindex="-1"><a class="header-anchor" href="#how-to-run-unit-tests" aria-hidden="true">#</a> How to run unit tests</h2><h3 id="running-all-tests" tabindex="-1"><a class="header-anchor" href="#running-all-tests" aria-hidden="true">#</a> Running all tests</h3><p>You can always run all tests by executing the <code>gotest</code> target in Makefile:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> gotest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This is almost equivalent to <code>go test ./...</code> but it enables and disables fail points before and after running tests.</p>`,6),u={href:"https://github.com/pingcap/failpoint",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.freebsd.org/cgi/man.cgi?query=fail",target:"_blank",rel:"noopener noreferrer"},p=n(`<h3 id="running-a-single-test" tabindex="-1"><a class="header-anchor" href="#running-a-single-test" aria-hidden="true">#</a> Running a single test</h3><p>To run a single test, you can manually repeat what <code>make gotest</code> does and narrow the scope in one test or one package:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /path/to/dir/of/test
go <span class="token builtin class-name">test</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-run</span> TestSchemaValidator <span class="token comment"># or with any other test flags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If one want to compile the test into a debug binary for running in a debugger, one can also use <code>go test -gcflags=&quot;all=-N -l&quot; -o ./t</code>, which removes any optimisations and outputs a <code>t</code> binary file ready to be used, like <code>dlv exec ./t</code> or combine it with the above to only debug a single test <code>dlv exec ./t -- -test.run &quot;^TestT$&quot; -check.f TestBinaryOpFunction</code>.</p><p>To display information on all the test flags, enter <code>go help testflag</code>.</p>`,5),g=t("strong",null,"GoLand",-1),m={href:"https://www.jetbrains.com/help/go/performing-tests.html",target:"_blank",rel:"noopener noreferrer"},v=t("strong",null,"VS Code",-1),b={href:"https://code.visualstudio.com/docs/languages/go#_test",target:"_blank",rel:"noopener noreferrer"},f=n(`<h3 id="running-tests-for-a-pull-request-todo" tabindex="-1"><a class="header-anchor" href="#running-tests-for-a-pull-request-todo" aria-hidden="true">#</a> Running tests for a pull request (TODO)</h3><blockquote><p>If you haven&#39;t joined the organization, you should wait for a member to comment with <code>/ok-to-test</code> to your pull request.</p></blockquote><p>Before you merge a pull request, it must pass all tests.</p><p>Generally, continuous integration (CI) runs the tests for you; however, if you want to run tests with conditions or rerun tests on failure, you should know how to do that, the the rerun guide comment will be sent when the CI tests failed.</p><h4 id="retest" tabindex="-1"><a class="header-anchor" href="#retest" aria-hidden="true">#</a> <code>/retest</code></h4><p>Rerun all failed CI test cases.</p><h4 id="test-test1-testn" tabindex="-1"><a class="header-anchor" href="#test-test1-testn" aria-hidden="true">#</a> <code>/test {{test1}} {{testN}}</code></h4><p>Run given CI failed tests.</p><h2 id="how-to-find-failed-tests" tabindex="-1"><a class="header-anchor" href="#how-to-find-failed-tests" aria-hidden="true">#</a> How to find failed tests</h2><p>There are several common causes of failed tests.</p><h3 id="assertion-failed" tabindex="-1"><a class="header-anchor" href="#assertion-failed" aria-hidden="true">#</a> Assertion failed</h3><p>The most common cause of failed tests is that assertion failed. Its failure report looks like:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestTopology
    info_test.go:72: 
            Error Trace:    info_test.go:72
            Error:          Not equal: 
                            expected: 1282967700000
                            actual  : 1628585893
            Test:           TestTopology
--- FAIL: TestTopology (0.76s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To find this type of failure, enter <code>grep -i &quot;FAIL&quot;</code> to search the report output.</p><h3 id="data-race" tabindex="-1"><a class="header-anchor" href="#data-race" aria-hidden="true">#</a> Data race</h3><p>Golang testing supports detecting data race by running tests with the <code>-race</code> flag. Its failure report looks like:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[2021-06-21T15:36:38.766Z] ==================
[2021-06-21T15:36:38.766Z] WARNING: DATA RACE
[2021-06-21T15:36:38.766Z] Read at 0x00c0055ce380 by goroutine 108:
...
[2021-06-21T15:36:38.766Z] Previous write at 0x00c0055ce380 by goroutine 169:
[2021-06-21T15:36:38.766Z]   [failed to restore the stack]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="goroutine-leak" tabindex="-1"><a class="header-anchor" href="#goroutine-leak" aria-hidden="true">#</a> Goroutine leak</h3><p>We use goleak to detect goroutine leak for tests. Its failure report looks like:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goleak: Errors on successful test run: found unexpected goroutines:
[Goroutine 104 in state chan receive, with go.etcd.io/etcd/pkg/logutil.(*MergeLogger).outputLoop on top of the stack:
goroutine 104 [chan receive]:
go.etcd.io/etcd/pkg/logutil.(*MergeLogger).outputLoop(0xc000197398)
    /go/pkg/mod/go.etcd.io/etcd@v0.5.0-alpha.5.0.20200824191128-ae9734ed278b/pkg/logutil/merge_logger.go:173 +0x3ac
created by go.etcd.io/etcd/pkg/logutil.NewMergeLogger
    /go/pkg/mod/go.etcd.io/etcd@v0.5.0-alpha.5.0.20200824191128-ae9734ed278b/pkg/logutil/merge_logger.go:91 +0x85

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),k={href:"https://github.com/uber-go/goleak/#determine-source-of-package-leaks",target:"_blank",rel:"noopener noreferrer"},x=n(`<h3 id="timeout" tabindex="-1"><a class="header-anchor" href="#timeout" aria-hidden="true">#</a> Timeout</h3><p>Every test case should run in at most five seconds.</p><p>If a test case takes longer, its failure report looks like:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[2021-08-09T03:33:57.661Z] The following test cases take too long to finish:
[2021-08-09T03:33:57.661Z] PASS: server_test.go:874: serverTestSerialSuite.TestTLS  7.388s
[2021-08-09T03:33:57.661Z] --- PASS: TestCluster (5.20s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="how-to-run-integration-tests" tabindex="-1"><a class="header-anchor" href="#how-to-run-integration-tests" aria-hidden="true">#</a> How to run integration tests</h2><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>All integration test files of openGemini are placed under the <code>tests</code> folder.</p></div><p>First, you need to start the test environment locally. It is recommended to use the following command to quickly start the local pseudo-cluster:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. build source code</span>
<span class="token function">make</span> go-build
<span class="token comment"># 2. start cluster for test (prefer linux)</span>
<span class="token function">bash</span> scripts/install_cluster.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="running-all-tests-1" tabindex="-1"><a class="header-anchor" href="#running-all-tests-1" aria-hidden="true">#</a> Running all tests</h3><p>You can always run all tests by executing the <code>integration-test</code> target in your Makefile:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> integration-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="running-a-single-test-1" tabindex="-1"><a class="header-anchor" href="#running-a-single-test-1" aria-hidden="true">#</a> Running a single test</h3><p>To run a single test, you can execute a command like this:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">URL</span><span class="token operator">=</span>http://127.0.0.1:8086 go <span class="token builtin class-name">test</span> <span class="token parameter variable">-mod</span><span class="token operator">=</span>mod <span class="token parameter variable">-test.parallel</span> <span class="token number">1</span> <span class="token parameter variable">-timeout</span> 10m ./tests <span class="token parameter variable">-run</span> TestServer_FullJoin  <span class="token parameter variable">-v</span> <span class="token assign-left variable">GOCACHE</span><span class="token operator">=</span>off 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="how-to-write-integration-tests" tabindex="-1"><a class="header-anchor" href="#how-to-write-integration-tests" aria-hidden="true">#</a> How to write integration tests</h3><p>Please refer to the existing integration test style to add your test cases.</p>`,16);function _(w,y){const a=l("ExternalLinkIcon");return o(),r("div",null,[c,t("p",null,[t("a",u,[e("pingcap/failpoint"),s(a)]),e(" is an implementation of "),t("a",h,[e("failpoints"),s(a)]),e(" for Golang. A fail point is used to add code points where you can inject errors. Fail point is a code snippet that is only executed when the corresponding fail point is active.")]),p,t("p",null,[e("If you develop with "),g,e(", you can also run a test from the IDE with manually enabled and disabled fail points. See the "),t("a",m,[e("documentation"),s(a)]),e(" for details.")]),t("p",null,[e("If you develop with "),v,e(", you can also run a test from the editor with manually enabled and disabled fail points. See the "),t("a",b,[e("documentation"),s(a)]),e(" for details.")]),f,t("p",null,[e("To determine the source of package leaks, see the "),t("a",k,[e("documentation"),s(a)])]),x])}const I=i(d,[["render",_],["__file","test_tutorials.html.vue"]]);export{I as default};
