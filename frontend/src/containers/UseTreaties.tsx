import React, { Fragment, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { Footer } from '../components/Footers/Footer';

// Colors
import { COLORS } from '../style_constants';

// Responsive
import { WIDTH } from '../style_constants';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 4%;
  padding-bottom: 4%;
  @media (max-width: ${WIDTH.MOBILE}) {
    padding-top: 13%;
    padding-bottom: 13%;
  }
`;

const TitleWrapper = styled.h1`
  margin-bottom: 2%;
  font-size: 2em;
  text-align: center;
  font-style: normal;
  color: ${COLORS.BLACK};
  margin-top: 0px;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.5em;
    margin-bottom: 5%;
  }
`;

const CustomParagraphWrapper = styled.p`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 3%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
  }
`;

const SemiTitleWrapper = styled.h3`
  font-style: normal;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 0.5%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
    margin-top: 7%;
    margin-bottom: 2%;
  }
`;

const CustomSecondParagraphWrapper = styled.p`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 1%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
  }
`;

const CustomUlWrapper = styled.ul`
  font-style: normal;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 3%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
  }
`;

const CustomBottomParagraphWrapper = styled(CustomSecondParagraphWrapper)`
  margin-bottom: 3%;
`;

export const UseTreaties = (): JSX.Element => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const {
    requestUserState: {
      sessionState
    },
    dispatch,
    requestUserActionTyps
  } = useContext(UserContext);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
  useEffect(() => {
    if(sessionState === false){
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus().then((data) => {
        dispatch({
          type: requestUserActionTyps.REQUEST_SUCCESS,
          payload: {
            session: data.session,
            user: data.user,
          }
        });
        if(!data.session && location.key === 'default') {
          navigate(
            '/',
            { state: { display: true, success: "ログインしてください。"}}
          )
        }
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          dispatch({
            type: requestUserActionTyps.REQUEST_FAILURE,
            payload: {
              errors: e.response.data.errors
            }
          });
        } else {
          throw e;
        }
      })
    }
  }, [
    dispatch,
    sessionState,
    requestUserActionTyps.REQUEST,
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE,
    navigate,
    location.key
  ]);

  return (
    <>
      <Header />
      <MainWrapper>
        <TitleWrapper>
          利用規約
        </TitleWrapper>
        <CustomParagraphWrapper>
          この利用規約(以下、「本規約」といいます。)は、本サービス(本サイトを含むものとし、以下、特に両者を区別しません。)の利用条件を定めるものです。本規約は、本サービスを利用するすべてのユーザーに適用されます。
        </CustomParagraphWrapper>
        <SemiTitleWrapper>
          本規約への同意
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、本サービスを利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。本規約に同意しないユーザーは、本サービスをご利用いただけません。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          利用登録
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスの利用を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、本サービスの利用登録をすることができます。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          登録拒否
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、以下のいずれかの事由があると判断した場合、利用登録の申請を承認しないことがあります。当社は登録拒否の理由について一切の開示義務を負いません。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>虚偽の事項を届け出た場合</li>
          <li>本規約に違反したことがある者からの申請である場合</li>
          <li>その他、当社が利用登録を相当でないと判断した場合</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          未成年による利用
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーが未成年である場合には、法定代理人の同意を得た上で、本サービスを利用してください。法定代理人の同意を得ずに本サービスのご利用を開始したユーザーが成年に達した場合、未成年者であった間の利用行為が追認したものとみなします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          ログイン情報の管理
        </SemiTitleWrapper>
        <CustomBottomParagraphWrapper>
          ユーザーは、自己の責任において、本サービスのログイン情報を適切に管理するものとします。ユーザーは、いかなる場合にも、ログイン情報を第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当社は、ログイン情報が第三者によって使用されたことによって生じた損害につき、当社に故意又は重大な過失がある場合を除き、一切の責任を負いません。
        </CustomBottomParagraphWrapper>
        <SemiTitleWrapper>
          コンテンツのご利用
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、ユーザーに対し、本サービスが提供する文章、画像、動画、音声、音楽、ソフトウェア、プログラム、コードその他のコンテンツについて、本サービスの利用範囲内における私的な利用を許諾します。有償コンテンツについては、当社が定める利用料金の支払いが完了した場合に、本サービスの利用範囲内における私的な利用を許諾します。これは、譲渡及び再許諾できない、非独占的な利用権です。この範囲を超えて本サービスが提供するコンテンツを利用することは一切禁止します。理由の如何を問わず、ユーザーが本サービスを利用する権利を失った場合、本サービスの一切のコンテンツの利用ができなくなることを、ユーザーは予め承諾するものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          遅延損害金
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社に対する金銭債務の支払を遅延したユーザーは、当社に対し、年14.6%の割合による遅延損害金を支払うものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          ユーザーの投稿
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、ユーザーの投稿に含まれる情報を送信することについて適法な権利を有していること、及びユーザーの投稿が第三者の知的財産権(著作権、特許権、実用新案権、商標権、意匠権(それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。)又はアイデア、ノウハウ等をいい、以下同様とします。)、所有権その他の権利を侵害していないことについて、当社に対し表明し、保証するものとします。ユーザーの投稿に関する著作権は、ユーザー自身に留保されます。当社はユーザーの投稿に関して著作権を取得することはありません。ただし、当社は、本サービスの提供、維持、改善又は本サービスのプロモーションに必要な範囲において、無償、無期限かつ地域非限定で、ユーザーの投稿を複製、翻訳、自動公衆送信及びそのために必要な送信可能化をすることができるものとします。この場合、ユーザーは、当社及び当社から権利を承継し又は許諾されたものに対し著作権人格権を行使しないものとします。ユーザーは自己の責任において投稿のバックアップを行わなければなりません。当社は、ユーザーの投稿のバックアップを行う義務を負わないものとします。ユーザーは以下の何かに該当する情報を投稿してはいけません。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>当社又は第三者の知的財産権、肖像権、プライバシー、名誉、その他の権利又は利益を侵害する情報</li>
          <li>ユーザーを特定可能な個人情報等を含む情報(ただし、利用登録に必要な場合等当社が求めた場合、その他当社が認めた場合を除きます。)</li>
          <li>わいせつな表現を含む情報</li>
          <li>異性、同性を問わず、面識のない第三者との出会い又はわいせつな行為等を目的とする情報</li>
          <li>自殺、自傷行為を誘引、勧誘又は助長する表現を含む情報</li>
          <li>薬物・危険ドラッグの売買に関する情報又は薬物危険ドラッグの不適切な利用を助長する表現を含む情報</li>
          <li>宗教的行為、宗教団体、政治的活動、政治団体の宣伝又は広告に関する情報</li>
          <li>ネットワークビジネス関連の勧誘等に関する情報</li>
          <li>ジャンクメール、スパムメールに相当する文面を含む情報</li>
          <li>未成年者に悪影響を及ぼすおそれのある情報</li>
          <li>残虐な表現その他他人に不快感を与える恐れのある情報</li>
          <li>コンピュータウイルス等の不正プログラムを含む情報</li>
          <li>その他当社が不適切と判断する情報</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          禁止事項
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>法令、裁判所の判決、決定若しくは命令、又は法令上拘束力のある行政措置に違反する行為又はこれらを助長する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当社や第三者の知的財産権を侵害する行為</li>
          <li>当社や第三者の肖像権、プライバシー、名誉、その他の権利又は利益を侵害する行為</li>
          <li>当社や第三者のサーバーまたはネットワークに過度の負担をかけたり、その正常な作動を妨害する行為</li>
          <li>当社のサービスの運営を妨害するおそれのある行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>逆アセンブル、逆コンパイル、リバースエンジニアリング等によって本サービスのソースコードを解析する行為</li>
          <li>本サービスに接続しているシステムに権限なく不正にアクセスし又は当社設備に蓄積された情報を不正に書き換え若しくは消去する行為</li>
          <li>本サービスのウェブサイトやソフトウェアを複製、送信、譲渡、貸与又は改変する行為</li>
          <li>本サービス上のアカウント又はコンテンツを第三者に有償で貸与、譲渡、売買等をする行為</li>
          <li>本サービスによって得られた情報を商業的に利用する行為</li>
          <li>当社が意図しない方法によって本サービスに関連して利益を得ることを目的とする行為</li>
          <li>当社が許諾しない本サービス上での宣伝、広告、勧誘、又は営業行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>違法、不正又は不当な目的を持って本サービスを利用する行為</li>
          <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>他のユーザーのアカウントを利用する行為</li>
          <li>面識のない異性との出会いを目的とした行為</li>
          <li>反社会的勢力に対して直接または間接に利益を供与する行為</li>
          <li>公序良俗に違反する行為</li>
          <li>歩行中、車両運転中、その他本サービスの利用が不適切な状況又は態様において本サービスを利用する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          反社会的勢力の排除
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、次の各号のいずれか一にも該当しないことを表明し、かつ将来にわたっても該当しないことを表明し、保証するものとします。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>自ら(法人その他の団体にあっては、自らの役員を含みます。)が、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋、社会運動等標ぼうゴロまたは特殊知能暴力集団等その他これらに準じる者(以下総称して「暴力団員等」といいます。)であること</li>
          <li>ユーザーが法人その他の団体の場合にあっては、暴力団員等が経営を支配していると認められる関係を有すること</li>
          <li>ユーザーが法人その他の団体の場合にあっては、暴力団員等が経営に実質的に関与していると認められる関係を有すること</li>
          <li>自らもしくは第三者の不正の利益を図る目的または第三者に損害を加える目的を持って取引を行うなど、暴力団員等を利用していると認められる関係を有すること</li>
          <li>暴力団員等に対して資金等を提供し、または便宜を供与するなどの関与をしていると認められる関係を有すること</li>
          <li>ユーザーが法人その他の団体の場合にあっては、自らの役員又は自らの経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること</li>
        </CustomUlWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、自らまたは第三者を利用して次の各号のいずれか一にでも該当する行為を行わないことを保証するものとします。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>暴力的な要求行為</li>
          <li>法的な責任を超えた不当な要求行為</li>
          <li>取引に関して、脅迫的な言動をし、または暴力を用いる行為</li>
          <li>風説を流布し、偽計を用い、または威力を用いて、当社の信用を毀損し、または当社の業務を妨害する行為</li>
          <li>その他前各号に準ずる行為</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          利用制限
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>本規約のいずれかの条項に違反した場合</li>
          <li>登録事項に虚偽の事実があることが判明した場合</li>
          <li>金銭債務の不履行があった場合</li>
          <li>当社からの連絡に対し、相当の期間が経過しても返答がない場合</li>
          <li>最終のご利用日から相当期間、本サービスのご利用がない場合</li>
          <li>反社会的勢力等であるか、反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合</li>
          <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          本サービスの提供の停止
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。当社は、この場合にユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
          <li>地震、落雷、火災、停電、天災またはウイルスの蔓延などの不可抗力により、本サービスの提供が困難となった場合</li>
          <li>コンピュータまたは通信回路等が事故により停止した場合</li>
          <li>その他、当社が本サービスの提供が困難と判断した場合</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          退会
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、当社の定める手続きにより、利用登録を抹消し、本サービスから退会できるものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          保証の否認
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、本サービスや本サービスが提供するコンテンツに、システムバグや第三者の権利侵害が含まれないことを保証するものではありません。また、安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性を保証するものでもありません。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          免責
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、本サービスに関してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当社とユーザーとの間の契約(本規約を含みます。)が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。消費者契約に該当する場合であっても、当社は、当社の過失(重過失を除きます。)によってユーザーに生じた損害のうち特別の事情から生じた損害(当社またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。)について、一切の責任を負いません。ユーザーと他のユーザーまたは第三者との間において生じたトラブルについても一切の責任を負いません。当社は、本サービスに関してユーザーが被った損害につき、当該損害が発生した月内にユーザーが当社に支払った利用料金を超えて賠償する責任を負わないものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          サービス内容の変更
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、ユーザーに通知することなく、本サービスの内容を変更したり、本サービスの提供を中止、終了することができるものとします。当社は、これによってユーザーに生じた損害について一切の責任を負いません。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          利用規約の変更
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は、ユーザーに通知することなく、いつでも本規約を変更することができるものとします。変更後の本規約は、当社ウェブサイトに掲示された時点から効力を生じるものとします。本規約の変更後、本サービスの利用を継続したユーザーは、変更後の本規約に同意したものとみなします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          個人情報の取り扱い
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスの利用によって取得するユーザーの個人情報については、当社のプライバシーポリシーに従い適切に取り扱うものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          通知または連絡
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          権利義務の譲渡
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本契約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          事業譲渡
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          当社は本サービスにかかる事業を他社に事業譲渡(事業譲渡、会社分割その他事業が移転するあらゆる場合を含みます。)した場合には、当該事業譲渡に伴い利用契約上の地位、本契約に基づく権利及び義務並びにユーザーの情報を当該事業譲渡の譲受人に譲渡することができるものとします。ユーザーは、かかる譲渡につき予め同意したものとみなします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          適用関係
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本契約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。当社は本サービスに関し、本契約のほか、ご利用にあたってのルールを定めることがあります。これらのルールは、その名称のいかんに関わらず、本契約の一部を構成するものとします。本契約がこれらのルールと矛盾する場合には、これらのルールが優先して適用されるものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          分離可能性
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本契約のいずれかの条項又はその一部が無効又は執行不能と判断された場合であっても、当該判断は他の部分に影響を及ぼさず、本契約の残りの部分は、引き続き有効かつ執行力を有するものとします。
        </CustomSecondParagraphWrapper>
        <SemiTitleWrapper>
          準拠法・裁判管轄
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する地方裁判所を専属的合意管轄とします。
        </CustomSecondParagraphWrapper>
        <CustomSecondParagraphWrapper>
          2022年03月06日 制定
        </CustomSecondParagraphWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
