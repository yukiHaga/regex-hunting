import React, { Fragment, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { Footer } from '../components/Footers/Footer.jsx';

// Colors
import { COLORS } from '../style_constants.js';

// Responsive
import { WIDTH } from '../style_constants.js';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.tsx";

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

const CustomURLWrapper = styled.div`
  font-style: normal;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 3%;
  text-decoration: none;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
`;

const CustomAnchor = styled.a`
  text-decoration: none;
  color: ${COLORS.BLUE};
`;

const CustomBottomParagraphWrapper = styled(CustomSecondParagraphWrapper)`
  margin-bottom: 3%;
`;

const CustomEmailWrapper = styled.div`
  font-style: normal;
  color: ${COLORS.BLACK};
  width: 60%;
  margin: 0 auto;
  text-decoration: none;
  margin-bottom: 1%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.0em;
    width: 80%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
`;

export const PrivacyPolicies = () => {

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
          プライバシーポリシー
        </TitleWrapper>
        <CustomParagraphWrapper>
          Regex Hunting（以下「本サービス」といいます）が提供するサービスにおける、ユーザーについての個人情報を含む利用者情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </CustomParagraphWrapper>
        <SemiTitleWrapper>
          1. お客様から取得する情報
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスは、お客様から以下の情報を取得します。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>氏名(ニックネームやペンネームも含む)</li>
          <li>メールアドレス</li>
          <li>写真や動画</li>
          <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
          <li>Cookie(クッキー)を用いて生成された識別情報</li>
          <li>OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報</li>
          <li>本サービスの滞在時間、入力履歴、購買履歴等の本サービスにおけるお客様の行動履歴</li>
          <li>本サービスの起動時間、入力履歴、購買履歴等の本サービスの利用履歴</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          2. お客様の情報を利用する目的
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスは、お客様から取得した情報を、以下の目的のために利用します。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>本サービスに関する登録の受付、お客様の本人確認、認証のため</li>
          <li>お客様の本サービスの利用履歴を管理するため</li>
          <li>利用料金の決済のため</li>
          <li>本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため</li>
          <li>市場分析、マーケティングのため</li>
          <li>本サービスに関するご案内をするため</li>
          <li>お客様からのお問い合わせに対応するため</li>
          <li>本サービスの規約や法令に違反する行為に対応するため</li>
          <li>本サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li>本サービス規約の変更等を通知するため</li>
          <li>以上の他、本サービスの提供、維持、保護及び改善のため</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          3. 第三者提供
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
          但し、次の場合は除きます。
        </CustomSecondParagraphWrapper>
        <CustomUlWrapper>
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>本サービスが買収された場合</li>
          <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </CustomUlWrapper>
        <SemiTitleWrapper>
          4. アクセス解析ツール
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          本サービスは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
        </CustomSecondParagraphWrapper>
        <CustomURLWrapper>
          <CustomAnchor href="https://marketingplatform.google.com/about/analytics/terms/jp/">
            Google アナリティクス利用規約
          </CustomAnchor>
        </CustomURLWrapper>
        <SemiTitleWrapper>
          5. プライバシーポリシーの変更
        </SemiTitleWrapper>
        <CustomBottomParagraphWrapper>
          本サービスは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </CustomBottomParagraphWrapper>
        <SemiTitleWrapper>
          6. お問い合わせ
        </SemiTitleWrapper>
        <CustomSecondParagraphWrapper>
          お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
        </CustomSecondParagraphWrapper>
        <CustomEmailWrapper>
          e-mail: yukihaga598@gmail.com
        </CustomEmailWrapper>
        <CustomBottomParagraphWrapper>
          この場合、必ず、運転免許証のご提示等本サービスが指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
        </CustomBottomParagraphWrapper>
        <SemiTitleWrapper>
          7. 事業者の名称
        </SemiTitleWrapper>
        <CustomBottomParagraphWrapper>
          Regex Hunting
        </CustomBottomParagraphWrapper>
        <CustomSecondParagraphWrapper>
          2022年01月24日 制定
        </CustomSecondParagraphWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
